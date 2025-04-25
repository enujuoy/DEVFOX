// 🔹 screens/MapScreen.tsx
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import MapView from 'react-native-maps';

import CustomMap from '../components/Map';
import { getNearbyStores } from '../utils/getNearbyStores';
import { notifyNearbyStores } from '../utils/sendStoreNotifications';

export default function MapScreen() {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [stores, setStores] = useState<any[]>([]);
  const [radius, setRadius] = useState(1000);
  const mapRef = useRef<MapView>(null);

  const fetchStores = async (lat: number, lon: number, selectedRadius: number) => {
    const nearby = await getNearbyStores(lat, lon, selectedRadius);
    setStores(nearby);
    await notifyNearbyStores(nearby);
  };

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
      const { latitude, longitude } = loc.coords;
      setLocation({ latitude, longitude });

      await fetchStores(latitude, longitude, radius);
    })();
  }, []);

  useEffect(() => {
    if (location) {
      fetchStores(location.latitude, location.longitude, radius);
    }
  }, [radius]);

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
      {/* 🔹 지도 위 오른쪽 상단 거리 입력창 */}
      <TextInput
        style={styles.floatingInput}
        keyboardType="numeric"
        value={radius.toString()}
        onChangeText={(text) => {
          const num = parseInt(text);
          if (!isNaN(num)) setRadius(num);
        }}
        placeholder="반경(m)"
      />

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
  floatingInput: {
    position: 'absolute',
    top: 40,
    right: 20,
    height: 36,
    width: 100,
    backgroundColor: '#ffffffcc',
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 13,
    borderWidth: 1,
    borderColor: '#ccc',
    zIndex: 999,
  },
});
