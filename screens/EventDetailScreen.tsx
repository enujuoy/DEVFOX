import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { EventStackParamList } from '../components/BottomTab'; // 혹은 정의된 위치
import Header from '../components/Header';

const { width } = Dimensions.get('window');

type EventDetailRouteProp = RouteProp<EventStackParamList, 'EventDetail'>;

const EventDetailScreen = () => {
  const route = useRoute<EventDetailRouteProp>();
  const { title, image, description, date } = route.params;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Header />
        <Text style={styles.title}>{title}</Text>
        <Image source={image} style={styles.image} resizeMode="contain" />
        <Text style={styles.date}>{date}</Text>
        <Text style={styles.description}>{description}</Text>
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
  date: {
    fontSize: 13,
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 20,
  },
});
