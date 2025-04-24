import React, { useRef, useEffect } from 'react';
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { EventStackParamList } from './BottomTab';


const sliderWidth = Dimensions.get('window').width;
const itemWidth = sliderWidth * 0.9;

const events = [
  {
    id: '1',
    image: require('../assets/event1.jpg'),
    title: '春祭り2025',
    description: '地域の文化を楽しめる年に一度の春のイベント！',
  },
  {
    id: '2',
    image: require('../assets/event2.jpg'),
    title: '夜市フェスティバル',
    description: '夜のマーケットでグルメとショッピングを満喫！',
  },
  {
    id: '3',
    image: require('../assets/event3.jpg'),
    title: '夏の花火大会',
    description: '夏の夜空を彩る大規模な花火ショー！',
  },
];

const EventSlider = () => {
  const flatListRef = useRef<FlatList>(null);
  const currentIndex = useRef(0);
  const navigation = useNavigation<StackNavigationProp<EventStackParamList>>();

  useEffect(() => {
    const interval = setInterval(() => {
      currentIndex.current = (currentIndex.current + 1) % events.length;
      flatListRef.current?.scrollToIndex({
        index: currentIndex.current,
        animated: true,
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('EventDetail', {
                title: item.title,
                image: item.image,
                description: item.description,
              })
            }
          >
            <Image source={item.image} style={styles.image} resizeMode="cover" />
          </TouchableOpacity>
        )}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        scrollEnabled={true}
      />
    </View>
  );
};

export default EventSlider;

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  listContainer: {
    paddingHorizontal: 10,
  },
  image: {
    width: itemWidth,
    height: 160,
    borderRadius: 12,
    marginHorizontal: 5,
  },
});