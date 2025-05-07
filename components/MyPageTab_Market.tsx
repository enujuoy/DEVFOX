import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyPageScreen_Market from '../screens/MyPageScreen_Market';
import MyPageScreen_Market_Event from '../screens/MyPageScreen_Market_Event';
import EventUpdateScreen from '../screens/EventUpdateScreen';
import EventDetailScreen from '../screens/EventDetailScreen';

export type MyPageMarketStackParamList = {
    MyPageTop: undefined;
    EventManagement: undefined;
    EventUpdate: {
      id: string;
      title: string;
      description: string;
      date: string;
    }; // ❗️여기서 ? 제거
    StoreRegister: undefined;
    EventDetail: {
      title: string;
      description: string;
      date: string;
      image: any;
    };
  };

const Stack = createStackNavigator<MyPageMarketStackParamList>();

export default function MyPageTab_Market() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MyPageTop" component={MyPageScreen_Market} />
      <Stack.Screen name="EventManagement" component={MyPageScreen_Market_Event} />
      <Stack.Screen name="EventUpdate" component={EventUpdateScreen} />
      <Stack.Screen name="EventDetail" component={EventDetailScreen} />
    </Stack.Navigator>
  );
}
