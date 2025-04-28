// utils/useNearbyStores.ts

import { useEffect, useState } from 'react';
import { getNearbyStores } from './getNearbyStores';
import { db } from '../firebaseConfig';
import { collection, query, where, getDocs, doc, getDoc, Timestamp } from 'firebase/firestore';
import { getDistance } from './distance';
import { NearbyStore, StoreWithDetails, UserPreferences, StoreEvent } from '../types';
import { notifyNearbyStores } from './sendStoreNotifications';

export default function useNearbyStores(lat: number, lon: number, radius: number) {
  const [stores, setStores] = useState<StoreWithDetails[]>([]);
  const [popupText, setPopupText] = useState('');
  const [popupVisible, setPopupVisible] = useState(false);
  const [highlight, setHighlight] = useState(false);

  const [eventPopupText, setEventPopupText] = useState('');
  const [eventPopupVisible, setEventPopupVisible] = useState(false);

  const [selectedStore, setSelectedStore] = useState<StoreWithDetails | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<StoreEvent | null>(null);

  const hidePopup = () => setPopupVisible(false);
  const hideEventPopup = () => setEventPopupVisible(false);

  const fetchUserPreferences = async (): Promise<UserPreferences> => {
    const docRef = doc(db, 'userPreferences', 'selected');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        selectedAmenities: Array.isArray(data.selectedAmenities) ? data.selectedAmenities : [],
        selectedMenus: Array.isArray(data.selectedMenus) ? data.selectedMenus : [],
      };
    } else {
      return { selectedAmenities: [], selectedMenus: [] };
    }
  };

  const checkHighlightAndPopup = async (targetStores: StoreWithDetails[]) => {
    if (targetStores.length === 0 || lat === 0 || lon === 0) return;

    const userPrefs = await fetchUserPreferences();

    const cleanUserAmenities = userPrefs.selectedAmenities.filter(a => a.trim() !== '');
    const cleanUserMenus = userPrefs.selectedMenus.filter(m => m.trim() !== '');

    for (const store of targetStores) {
      const dist = getDistance(lat, lon, store.latitude, store.longitude);
      if (dist * 1000 < 300) {
        // 기본 정보
        const amenityText = Array.isArray(store.amenities) && store.amenities.length > 0
          ? `\n🛠️ 設備: ${store.amenities.join(', ')}`
          : '';
        const menuText = Array.isArray(store.menu) && store.menu.length > 0
          ? `\n🍴 メニュー: ${store.menu.join(', ')}`
          : '';
        const popupContent = `📍 ${store.name}${amenityText}${menuText}`;

        const hasUserSelections = cleanUserAmenities.length > 0 || cleanUserMenus.length > 0;

        if (!hasUserSelections) {
          setPopupText(popupContent);
          setPopupVisible(true);
          setHighlight(false);
          setSelectedStore(store);
        } else {
          const lowerStoreAmenities = (store.amenities || []).map(a => a.toLowerCase());
          const lowerStoreMenus = (store.menu || []).map(m => m.toLowerCase());
          const lowerUserAmenities = cleanUserAmenities.map(a => a.toLowerCase());
          const lowerUserMenus = cleanUserMenus.map(m => m.toLowerCase());

          const matched =
            lowerStoreAmenities.some(a => lowerUserAmenities.includes(a)) ||
            lowerStoreAmenities.some(a => lowerUserMenus.includes(a)) ||
            lowerStoreMenus.some(m => lowerUserAmenities.includes(m)) ||
            lowerStoreMenus.some(m => lowerUserMenus.includes(m));

          setPopupText(popupContent);
          setPopupVisible(true);
          setHighlight(matched);
          setSelectedStore(store);
        }

        // 🔥 이벤트가 있다면 따로 이벤트 팝업도 띄움
        if (store.event) {
          const eventContent = `🎉 ${store.event.title}\n${store.event.description}`;
          setEventPopupText(eventContent);
          setEventPopupVisible(true);
          setSelectedEvent(store.event);
        } else {
          setEventPopupVisible(false);
          setSelectedEvent(null);
        }

        return;
      }
    }

    // 근처 매장이 없다면 팝업 숨김
    setPopupVisible(false);
    setEventPopupVisible(false);
    setHighlight(false);
    setSelectedStore(null);
    setSelectedEvent(null);
  };

  const fetchStores = async () => {
    const nearby = await getNearbyStores(lat, lon, radius);

    const detailedStores: StoreWithDetails[] = await Promise.all(
      nearby.map(async (store: NearbyStore): Promise<StoreWithDetails> => {
        const storeSnap = await getDocs(
          query(collection(db, 'serviceAreas'), where('name', '==', store.name))
        );

        if (storeSnap.empty) {
          return { ...store, description: '', storeCode: '' };
        }

        const storeDoc = storeSnap.docs[0];
        const storeData = storeDoc.data();
        const amenities = storeData.amenities || [];
        const menu = storeData.menu || [];
        const storeCode = storeData.serviceAreaCode || '';

        let event: StoreEvent | undefined;
        const eventSnap = await getDocs(
          query(collection(db, 'events'), where('storeCode', '==', storeCode))
        );
        if (!eventSnap.empty) {
          const eventDoc = eventSnap.docs[0].data();
          // 이벤트 날짜를 타임스탬프로 변환
          let eventDate = 0;
          if (eventDoc.startDate instanceof Timestamp) {
            eventDate = eventDoc.startDate.toMillis();
          } else if (eventDoc.startDate && typeof eventDoc.startDate === 'object' && 'seconds' in eventDoc.startDate) {
            eventDate = eventDoc.startDate.seconds * 1000;
            if (eventDoc.startDate.nanoseconds) {
              eventDate += Math.floor(eventDoc.startDate.nanoseconds / 1000000);
            }
          } else if (typeof eventDoc.startDate === 'string') {
            const parsed = Date.parse(eventDoc.startDate);
            eventDate = isNaN(parsed) ? 0 : parsed;
          } else if (eventDoc.startDate instanceof Date) {
            eventDate = eventDoc.startDate.getTime();
          } else if (typeof eventDoc.startDate === 'number') {
            eventDate = eventDoc.startDate;
          }
          event = {
            title: eventDoc.title,
            description: eventDoc.description,
            image: eventDoc.image ?? undefined,
            date: eventDate,
          };
        }

        return {
          ...store,
          description: storeData.description || '',
          amenities,
          menu,
          event,
          storeCode,
        };
      })
    );

    setStores(detailedStores);
    await notifyNearbyStores(nearby);
    await checkHighlightAndPopup(detailedStores);
  };

  useEffect(() => {
    if (lat === 0 && lon === 0) return;
    fetchStores();
  }, [lat, lon, radius]);

  return {
    stores,
    popupText,
    popupVisible,
    hidePopup,
    highlight,
    eventPopupText,
    eventPopupVisible,
    hideEventPopup,
    selectedStore,
    selectedEvent,
    fetchStores,
  };
}
