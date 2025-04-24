import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyPageScreen_Market from '../screens/MyPageScreen_Market';
import EventUpdateScreen from '../screens/EventUpdateScreen';
import EventDetailScreen from '../screens/EventDetailScreen';
// (필요하다면 여기에 StoreRegistrationScreen, ProductRegistrationScreen 등 추가)

export type MyPageMarketStackParamList = {
  Market: undefined;
  EventManagement: undefined; // 이벤트 전체 관리 목록
  EventInfo: { title: string; date: string }; // 이벤트 상세 정보
  StoreRegistration: undefined; // 스토어 등록/관리
  ProductRegistration: undefined; // 상품 등록/관리
};

const Stack = createStackNavigator<MyPageMarketStackParamList>();

export default function MyPageMarketStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Market" component={MyPageScreen_Market} />
      <Stack.Screen name="EventInfo" component={EventDetailScreen} />
      <Stack.Screen name="EventManagement" component={EventUpdateScreen} />

      {/* 추후 이 화면들 구현되면 연결 */}
      {/* <Stack.Screen name="StoreRegistration" component={StoreRegistrationScreen} /> */}
      {/* <Stack.Screen name="ProductRegistration" component={ProductRegistrationScreen} /> */}
    </Stack.Navigator>
  );
}
