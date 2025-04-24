import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTab from './components/BottomTab';
import CategorySettingScreen from './screens/CategorySettingScreen';
import MapScreen from './screens/MapScreen';
import ManagerPage from './screens/ManagerPage';
import MemberManagementScreen from './screens/MemberManagementScreen';
import ServiceAreaManagementScreen from './screens/ServiceAreaManagementScreen';
import StoreManagementScreen from './screens/StoreManagementScreen';
import StoreAuthenticationScreen from './screens/StoreAuthenticationScreen';
import EventManagementScreen from './screens/EventManagementScreen';
import MemberModifyScreen from './screens/MemberModifyScreen';
import StoreDetailsScreen from './screens/StoreDetailsScreen';

interface Member {
  id: number;
  email: string;
  lastActive: string;
  registrationDate?: string;
  memberType?: '一般会員' | '店舗主';
  authKey?: string;
}

export type RootStackParamList = {
  MainTabs: undefined;
  CategorySetting: undefined;
  Map: undefined;
  Mypage: undefined;
  MemberManagement: undefined;
  ServiceAreaManagement: undefined;
  StoreManagement: undefined;
  StoreAuthentication: undefined;
  EventManagement: undefined;
  MemberModify: { member: Member };
  StoreDetails: { // 필수 추가
    areaId: number;
    areaName: string;
  };
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="MainTabs" component={BottomTab} />
        <RootStack.Screen name="CategorySetting" component={CategorySettingScreen} />
        <RootStack.Screen name="Map" component={MapScreen} />
        <RootStack.Screen name="Mypage" component={ManagerPage} />
        <RootStack.Screen name="MemberManagement" component={MemberManagementScreen} />
        <RootStack.Screen 
          name="ServiceAreaManagement" 
          component={ServiceAreaManagementScreen}
        />
        <RootStack.Screen name="StoreManagement" component={StoreManagementScreen} />
        <RootStack.Screen name="StoreAuthentication" component={StoreAuthenticationScreen} />
        <RootStack.Screen name="EventManagement" component={EventManagementScreen} />
        <RootStack.Screen name="MemberModify" component={MemberModifyScreen} />
        <RootStack.Screen name="StoreDetails" component={StoreDetailsScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
