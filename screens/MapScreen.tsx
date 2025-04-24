import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Animated, Text, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import MapView from 'react-native-maps';

import CustomMap from '../components/Map';
import { getNearbyStores } from '../utils/getNearbyStores';
import { notifyNearbyStores } from '../utils/sendStoreNotifications';

export default function MapScreen() {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [stores, setStores] = useState<any[]>([]);
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    (async () => {
      // 1. 알림 권한 요청
      const { status: notifStatus } = await Notifications.requestPermissionsAsync();
      if (notifStatus !== 'granted') {
        alert('通知の許可が必要です');
        return;
      }

      // 2. 위치 권한 요청
      const { status: locStatus } = await Location.requestForegroundPermissionsAsync();
      if (locStatus !== 'granted') {
        alert('位置情報の許可が必要です');
        return;
      }

      // 3. 현재 위치 얻기
      const loc = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = loc.coords;
      console.log(' 현재 위치:', latitude, longitude); 
      setLocation({ latitude, longitude });

      // 4. 편의점 정보 불러오기
      const nearby = await getNearbyStores(latitude, longitude);
      console.log('🟩 편의점 목록:', JSON.stringify(nearby, null, 2));
      setStores(nearby);

      // 5. 편의점 정보에 대해 알림 보내기
      await notifyNearbyStores(nearby);
    })();
  }, []);

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
      <CustomMap
        myLat={location.latitude}
        myLon={location.longitude}
        serviceAreas={stores}
        mapRef={mapRef}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
