// utils/sendStoreNotifications.ts
import * as Notifications from 'expo-notifications';
import { getDistance } from './distance';
import { NearbyStore } from '../types';

export async function notifyNearbyStores(
  stores: NearbyStore[],
  lat: number,
  lon: number,
  lastNotifiedId: string | null,
  setLastNotifiedId: (id: string) => void
) {
  if (stores.length === 0) return;

  let nearestStore: NearbyStore | null = null;
  let minDistance = Number.MAX_VALUE;

  for (const store of stores) {
    const dist = getDistance(lat, lon, store.latitude, store.longitude);
    if (dist < minDistance) {
      minDistance = dist;
      nearestStore = store;
    }
  }

  if (nearestStore && nearestStore.placeId !== lastNotifiedId && minDistance * 100 < 300) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: '近くのコンビニ',
        body: nearestStore.name,
      },
      trigger: null,
    });
    setLastNotifiedId(nearestStore.placeId);
  }
}
