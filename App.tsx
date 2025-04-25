import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTab from './components/BottomTab';
import CategorySettingScreen from './screens/CategorySettingScreen';
import MapScreen from './screens/MapScreen';
import ProductRegistrationScreen from './screens/ProductRegistrationScreen';
import ServiceAreaInfoScreen from './screens/ServiceAreaInfoScreen';
import EventDetailScreen from './screens/EventDetailScreen';
import * as Notifications from 'expo-notifications';

export type RootStackParamList = {
  MainTabs: undefined;
  CategorySetting: undefined;
  Map: undefined;
  ProductRegistration: undefined;
  StoreRegister: undefined;
  EventManagement: undefined;
  ServiceAreaInfoScreen: undefined;
  EventDetail: undefined; // EventDetail 추가
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
        <RootStack.Screen name="ProductRegistration" component={ProductRegistrationScreen} />
        <RootStack.Screen name="ServiceAreaInfoScreen" component={ServiceAreaInfoScreen} />
        <RootStack.Screen name="EventDetail" component={EventDetailScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
