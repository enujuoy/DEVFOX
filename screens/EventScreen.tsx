import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from '../components/BottomTab';
import { RootStackParamList } from '../App'; // 추가된 임포트

// 확장된 네비게이션 타입
type EventScreenNavProp = StackNavigationProp<
  HomeStackParamList & RootStackParamList, // 타입 병합
  'Event'
>;

export default function EventScreen() {
  const navigation = useNavigation<EventScreenNavProp>();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Header />

        <Text style={styles.title}>海老名 SA</Text>

        <Image
          source={require('../assets/main.jpg')}
          style={styles.mainImage}
        />

        <View style={styles.categoryRow}>
          <TouchableOpacity style={styles.categoryButton}>
            <Text style={styles.categoryText}>EVENTS</Text>
          </TouchableOpacity>
          
          {/* 수정된 서비스 에리어 버튼 */}
          <TouchableOpacity 
            style={styles.categoryButton}
            onPress={() => navigation.navigate('StoreDetails', {
              areaId: 1,
              areaName: '海老名 SA'
            })}
          >
            <Text style={styles.categoryText}>サービスエリア</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.categoryButton}>
            <Text style={styles.categoryText}>情報</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>イベント</Text>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('EventDetail', {
              title: '春祭り2025',
              image: require('../assets/event1.jpg'),
              description: '地域の文化を楽しめる年に一度の春のイベント！',
            })
          }
        >
          <View style={styles.eventCard}>
            <Image
              source={require('../assets/event1.jpg')}
              style={styles.image}
            />
            <Text style={styles.eventTitle}>春祭り2025</Text>
            <Text style={styles.eventDescription}>
              地域の文化を楽しめる年に一度の春のイベント！
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('EventDetail', {
              title: '夜市フェスティバル',
              image: require('../assets/event2.jpg'),
              description: '夜のマーケットでグルメとショッピングを満喫！',
            })
          }
        >
          <View style={styles.eventCard}>
            <Image
              source={require('../assets/event2.jpg')}
              style={styles.image}
            />
            <Text style={styles.eventTitle}>夜市フェスティバル</Text>
            <Text style={styles.eventDescription}>
              夜のマーケットでグルメとショッピングを満喫！
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

// 스타일은 기존과 동일하게 유지
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  eventCard: {
    marginBottom: 24,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  eventDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  mainImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  categoryText: {
    fontSize: 14,
  },
  categoryButton: {
    backgroundColor: '#ddd',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 12,
  },
});
