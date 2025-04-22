// components/MyPageMarketStack.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyPageScreen_Market from '../screens/MyPageScreen_Market';
import MyPageScreen_Market_Event from '../screens/MyPageScreen_Market_Event';
import EventUpdateScreen from '../screens/EventUpdateScreen';   // ← import
import StoreRegisterScreen from '../screens/StoreRegisterScreen';

export type MyPageMarketStackParamList = {
  MyPageTop: undefined;
  EventManagement: undefined;  // MyPageScreen_Market_Event
  EventUpdate: undefined;      //
  StoreRegister: undefined;
};

const Stack = createStackNavigator<MyPageMarketStackParamList>();

export default function MyPageMarketStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MyPageTop" component={MyPageScreen_Market} />
      <Stack.Screen name="EventManagement" component={MyPageScreen_Market_Event} />
      <Stack.Screen name="EventUpdate" component={EventUpdateScreen} />
      <Stack.Screen name="StoreRegister" component={StoreRegisterScreen} /> 
    </Stack.Navigator>
  );
}
