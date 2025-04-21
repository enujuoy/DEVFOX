import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Animated, TouchableOpacity, Image } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import CustomMap from '../components/Map';
import Popup from '../components/Popup';
import serviceAreas from '../constants/serviceAreas';
import { getDistance } from '../utils/distance';
import MapView from 'react-native-maps';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import BackIcon from '../assets/back_botton.png';

export default function MapScreen({ navigation }: { navigation: NativeStackNavigationProp<any> }) {
  const myLat = 35.42929653161845;
  const myLon = 139.3967174020167;

  const [popupVisible, setPopupVisible] = useState(false);
  const [popupText, setPopupText] = useState('');
  const popupOpacity = useRef(new Animated.Value(0)).current;
  const popupTranslate = useRef(new Animated.Value(0)).current;

  const [highlightVisible, setHighlightVisible] = useState(false);
  const [highlightText, setHighlightText] = useState('');
  const highlightOpacity = useRef(new Animated.Value(0)).current;
  const highlightTranslate = useRef(new Animated.Value(0)).current;

  const mapRef = useRef<MapView>(null);

  // ✅ 알림 권한 및 채널 설정
  useEffect(() => {
    const setupNotifications = async () => {
      if (Device.isDevice) {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== 'granted') {
          alert('通知の許可が必要です');
          return;
        }

        await Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
          vibrationPattern: [0, 250, 250, 250],
          sound: 'default',
        });
      } else {
        alert('実機でテストしてください');
      }
    };

    setupNotifications();
  }, []);

  // ✅ 알림 발송
  const triggerLocalNotification = async (title: string, body: string) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        sound: 'default',
      },
      trigger: null,
    });
  };

  // ✅ 팝업 애니메이션
  const showPopup = (text: string) => {
    setPopupText(text);
    setPopupVisible(true);
    popupTranslate.setValue(0);
    popupOpacity.setValue(0);

    Animated.parallel([
      Animated.timing(popupOpacity, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.timing(popupTranslate, { toValue: 0, duration: 300, useNativeDriver: true }),
    ]).start();

    setTimeout(() => {
      Animated.parallel([
        Animated.timing(popupOpacity, { toValue: 0, duration: 300, useNativeDriver: true }),
        Animated.timing(popupTranslate, { toValue: -40, duration: 300, useNativeDriver: true }),
      ]).start(() => setPopupVisible(false));
    }, 7000);
  };

  const showHighlight = (text: string) => {
    setTimeout(() => {
      setHighlightText(text);
      setHighlightVisible(true);
      highlightTranslate.setValue(0);
      highlightOpacity.setValue(0);

      Animated.parallel([
        Animated.timing(highlightOpacity, { toValue: 1, duration: 300, useNativeDriver: true }),
        Animated.timing(highlightTranslate, { toValue: 0, duration: 300, useNativeDriver: true }),
      ]).start();

      setTimeout(() => {
        Animated.parallel([
          Animated.timing(highlightOpacity, { toValue: 0, duration: 300, useNativeDriver: true }),
          Animated.timing(highlightTranslate, { toValue: -40, duration: 300, useNativeDriver: true }),
        ]).start(() => setHighlightVisible(false));
      }, 8000);
    }, 300);
  };

  const checkNearbyServiceArea = () => {
    for (const area of serviceAreas) {
      const distance = getDistance(myLat, myLon, area.latitude, area.longitude);
      if (distance <= 1.0) {
        showPopup(area.description);
        showHighlight('EV急速充電スタンド\n基数：3基');
        triggerLocalNotification(area.name, area.description);
        triggerLocalNotification('EV急速充電スタンド', '基数：3基');
        break;
      }
    }
  };

  useEffect(() => {
    checkNearbyServiceArea();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
        <Image source={BackIcon} style={styles.backIcon} />
      </TouchableOpacity>

      <CustomMap myLat={myLat} myLon={myLon} serviceAreas={serviceAreas} mapRef={mapRef} />

      {popupVisible && (
        <Popup
          type="normal"
          text={popupText}
          opacity={popupOpacity}
          translateY={popupTranslate}
        />
      )}

      {highlightVisible && (
        <Popup
          type="highlight"
          text={highlightText}
          opacity={highlightOpacity}
          translateY={highlightTranslate}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1000,
  },
  backIcon: {
    width: 32,
    height: 32,
    tintColor: '#333',
  },
});
