import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions } from 'react-native';
import Header from '../components/Header';
import BottomTab from '../components/BottomTab';

const { width } = Dimensions.get('window');

const EventDetailScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Header />

        <Text style={styles.title}>海老名 SA</Text>

        <Image
          source={require('../assets/event-detail.jpg')} // 이미지 넣기
          style={styles.image}
          resizeMode="contain"
        />

        <Text style={styles.location}>
          E1 東名高速道路EXPASA海老名（上り）中央催事場 にて
        </Text>
        <Text style={styles.date}>2025.04.04〜2025.06.09</Text>

        <Text style={styles.description}>
          新潟県・富山県・石川県・福井県の北陸4県、200点を超える多彩な商品の数々が名を連ね...
        </Text>

        <Text style={styles.subTitle}>催事概要</Text>
        <Text style={styles.date}>（開催期間） 2025年4月4日（金）～6月9日（月）</Text>
      </ScrollView>
    </View>
  );
};
export default EventDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    paddingBottom: 80,
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  image: {
    width: width - 40,
    height: 200,
    alignSelf: 'center',
    marginBottom: 10,
  },
  location: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  date: {
    fontSize: 13,
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
});