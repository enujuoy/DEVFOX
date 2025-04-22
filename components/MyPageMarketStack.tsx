// components/MyPageMarketStack.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyPageScreen_Market from '../screens/MyPageScreen_Market';
import MyPageScreen_Market_Event from '../screens/MyPageScreen_Market_Event';
import EventUpdateScreen from '../screens/EventUpdateScreen';   // ← import

export type MyPageMarketStackParamList = {
  MyPageTop: undefined;
  EventManagement: undefined;  // MyPageScreen_Market_Event
  EventUpdate: undefined;      // ← 새로 추가
};

const Stack = createStackNavigator<MyPageMarketStackParamList>();

export default function MyPageMarketStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MyPageTop" component={MyPageScreen_Market} />
      <Stack.Screen name="EventManagement" component={MyPageScreen_Market_Event} />
      <Stack.Screen name="EventUpdate" component={EventUpdateScreen} />  {/* ← 추가 */}
    </Stack.Navigator>
  );
}
