// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTab from './components/BottomTab';
import CategorySettingScreen from './screens/CategorySettingScreen';
import MapScreen from './screens/MapScreen';
import * as Notifications from 'expo-notifications';
import StoreDetailsScreen from './screens/StoreDetailsScreen';

export type RootStackParamList = {
  MainTabs: undefined;
  CategorySetting: undefined;
  Map: undefined;
  StoreDetails: { // 필수 추가
    storeCode: string;
    name: string;
  };
  EventDetail: { // ✅ 추가
    title: string;
    description: string;
    image?: string;
    date?: any;
  };
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,      
    shouldPlaySound: true,          
    shouldSetBadge: false,     
  }),
});

export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="MainTabs" component={BottomTab} />
        <RootStack.Screen name="CategorySetting" component={CategorySettingScreen} />
        <RootStack.Screen name="Map" component={MapScreen} />
        <RootStack.Screen name="StoreDetails" component={StoreDetailsScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
