import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import MainScreen from '../screens/MainScreen';
import EventScreen from '../screens/EventScreen';
import EventDetailScreen from '../screens/EventDetailScreen';
import MyPageScreen from '../screens/MyPageScreen_Market';

// 타입 정의
export type HomeStackParamList = {
  Main: undefined;
  Event: undefined;
  EventDetail: {
    title: string;
    image: any;
    description: string;
  };
};

export type EventStackParamList = {
  Event: undefined;
  EventDetail: {
    title: string;
    image: any;
    description: string;
  };
};

// Stack Navigators
const HomeStack = createStackNavigator<HomeStackParamList>();
const EventStack = createStackNavigator<EventStackParamList>();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Main" component={MainScreen} />
      <HomeStack.Screen name="Event" component={EventScreen} />
      <HomeStack.Screen name="EventDetail" component={EventDetailScreen} />
    </HomeStack.Navigator>
  );
}

function EventStackScreen() {
  return (
    <EventStack.Navigator screenOptions={{ headerShown: false }}>
      <EventStack.Screen name="Event" component={EventScreen} />
      <EventStack.Screen name="EventDetail" component={EventDetailScreen} />
    </EventStack.Navigator>
  );
}

// Bottom Tab
const Tab = createBottomTabNavigator();

export default function BottomTab() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName: React.ComponentProps<typeof Ionicons>['name'] = 'home';
          if (route.name === 'HomeTab') iconName = 'home';
          else if (route.name === 'EventTab') iconName = 'gift';
          else if (route.name === 'MypageTab') iconName = 'person';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackScreen}
        options={{ tabBarLabel: 'ホーム' }}
      />
      <Tab.Screen
        name="EventTab"
        component={EventStackScreen}
        options={{ tabBarLabel: 'イベント' }}
      />
      <Tab.Screen
        name="MypageTab"
        component={MyPageScreen}
        options={{ tabBarLabel: 'マイページ' }}
      />
    </Tab.Navigator>
  );
}
