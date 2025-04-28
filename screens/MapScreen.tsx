// screens/MapScreen.tsx

import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import MapView from 'react-native-maps';

import useNearbyStores from '../utils/useNearbyStores';
import MapWithInputs from '../components/MapWithInputs';
import PopupMessage from '../components/Popup';

export default function MapScreen() {
  const navigation = useNavigation<any>();
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [radius, setRadius] = useState(1000);
  const mapRef = useRef<MapView>(null);

  const {
    stores,
    popupText,
    popupVisible,
    highlight,
    fetchStores,
    eventPopupText,
    eventPopupVisible,
    selectedStore,
    selectedEvent,
  } = useNearbyStores(location?.latitude ?? 0, location?.longitude ?? 0, radius);

  // 기본 팝업 애니메이션
  const popupOpacity = useRef(new Animated.Value(0)).current;
  const popupTranslateY = useRef(new Animated.Value(50)).current;

  // 이벤트 팝업 애니메이션
  const eventPopupOpacity = useRef(new Animated.Value(0)).current;
  const eventPopupTranslateY = useRef(new Animated.Value(50)).current;

  const showPopup = () => {
    Animated.parallel([
      Animated.timing(popupOpacity, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.timing(popupTranslateY, { toValue: 0, duration: 300, useNativeDriver: true }),
    ]).start();
  };

  const hidePopupAnimated = () => {
    Animated.parallel([
      Animated.timing(popupOpacity, { toValue: 0, duration: 300, useNativeDriver: true }),
      Animated.timing(popupTranslateY, { toValue: 50, duration: 300, useNativeDriver: true }),
    ]).start();
  };

  const showEventPopup = () => {
    Animated.parallel([
      Animated.timing(eventPopupOpacity, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.timing(eventPopupTranslateY, { toValue: 0, duration: 300, useNativeDriver: true }),
    ]).start();
  };

  const hideEventPopupAnimated = () => {
    Animated.parallel([
      Animated.timing(eventPopupOpacity, { toValue: 0, duration: 300, useNativeDriver: true }),
      Animated.timing(eventPopupTranslateY, { toValue: 50, duration: 300, useNativeDriver: true }),
    ]).start();
  };

  useEffect(() => {
    if (popupVisible) showPopup();
    else hidePopupAnimated();
  }, [popupVisible]);

  useEffect(() => {
    if (eventPopupVisible) showEventPopup();
    else hideEventPopupAnimated();
  }, [eventPopupVisible]);

  useEffect(() => {
    (async () => {
      const { status: notifStatus } = await Notifications.requestPermissionsAsync();
      if (notifStatus !== 'granted') {
        alert('通知の許可が必要です');
        return;
      }
      const { status: locStatus } = await Location.requestForegroundPermissionsAsync();
      if (locStatus !== 'granted') {
        alert('位置情報の許可が必要です');
        return;
      }
      const loc = await Location.getCurrentPositionAsync({});
      setLocation({ latitude: loc.coords.latitude, longitude: loc.coords.longitude });
    })();
  }, []);

  useEffect(() => {
    if (location) {
      fetchStores();
    }
  }, [location, radius]);

  // ✅ 편의점 팝업 터치
  const handleStorePress = () => {
    if (selectedStore) {
      navigation.navigate('StoreDetails', {
        screen: 'StoreDetails',
        params: {
          storeCode: selectedStore.storeCode,
          name: selectedStore.name,
        },
      });
    }
  };

  // ✅ 이벤트 팝업 터치
  const handleEventPress = () => {
    if (selectedEvent) {
      navigation.navigate('EventDetail', {
        screen: 'EventDetail',
        params: {
          title: selectedEvent.title,
          description: selectedEvent.description,
          image: selectedEvent.image ?? require('../assets/event1.jpg'), // 🔥 event1.jpg 기본
          date: selectedEvent.date || '', // 🔥 빈 문자열
        },
      });
    }
  };

  if (!location) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
        <Text>現在地を取得中...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapWithInputs
        location={location}
        radius={radius}
        setRadius={setRadius}
        stores={stores}
        mapRef={mapRef}
      />

      {popupVisible && (
        <PopupMessage
          text={popupText}
          opacity={popupOpacity}
          translateY={popupTranslateY}
          type={highlight ? 'highlight' : 'normal'}
          onPress={handleStorePress}
        />
      )}

      {eventPopupVisible && (
        <PopupMessage
          text={eventPopupText}
          opacity={eventPopupOpacity}
          translateY={eventPopupTranslateY}
          type="event"
          onPress={handleEventPress}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
