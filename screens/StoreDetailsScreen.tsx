import React from 'react';
import { ScrollView, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Header from '../components/Header';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.content}>
        {/* Main Image and Title */}
        <View style={styles.mainSection}>
          <Text style={styles.title}>おぼんdeごはん</Text>
          <Image
            source={{ uri: 'https://via.placeholder.com/350x200' }} // Replace with your actual image URL
            style={styles.mainImage}
          />
        </View>

        {/* Operating Hours and Contact */}
        <View style={styles.infoSection}>
          <Text style={styles.infoText}>営業時間：10:00～22:00（ラストオーダー21:30）</Text>
          <Text style={styles.infoText}>問合せ：046-204-7296</Text>
        </View>

        {/* Events Section */}
        <View style={styles.eventsSection}>
          <Text style={styles.eventsTitle}>イベント</Text>
          <TouchableOpacity style={styles.eventButton}>
            <Text style={styles.eventButtonText}>全品目20%割引イベント</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.eventButton}>
            <Text style={styles.eventButtonText}>新メニュー紹介</Text>
          </TouchableOpacity>
        </View>

        {/* Menu Section */}
        <View style={styles.menuSection}>
          <Text style={styles.menuTitle}>メニュー</Text>
          {/* Example Menu Items */}
          <MenuItem
            imageUrl="https://via.placeholder.com/100x100" // Replace with your actual image URL
            name="海老名定食(ホッケ一夜干し・鶏の南蛮揚げ)"
            price="1,280円"
          />
          <MenuItem
            imageUrl="https://via.placeholder.com/100x100" // Replace with your actual image URL
            name="真鯛の胡麻ダレだし茶漬け"
            price="1,280円"
          />
          <MenuItem
            imageUrl="https://via.placeholder.com/100x100" // Replace with your actual image URL
            name="しっとりバスクチーズケーキ"
            price="780円"
          />
        </View>

        {/* Payment Methods */}
        <View style={styles.paymentSection}>
          <Image
            source={{ uri: 'https://via.placeholder.com/350x50' }} // Replace with your actual image URL
            style={styles.paymentImage}
          />
          <Text style={styles.smartCodeText}>Smart Code</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const MenuItem = ({ imageUrl, name, price }) => (
  <View style={styles.menuItem}>
    <Image source={{ uri: imageUrl }} style={styles.menuItemImage} />
    <View style={styles.menuItemText}>
      <Text style={styles.menuItemName}>{name}</Text>
      <Text style={styles.menuItemPrice}>{price}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 10,
  },
  mainSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  mainImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  infoSection: {
    marginBottom: 20,
  },
  infoText: {
    fontSize: 14,
    color: '#333',
  },
  eventsSection: {
    marginBottom: 20,
  },
  eventsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  eventButton: {
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  eventButtonText: {
    fontSize: 16,
  },
  menuSection: {
    marginBottom: 20,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  menuItem: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  menuItemImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
    marginRight: 10,
  },
  menuItemText: {
    flex: 1,
    justifyContent: 'center',
  },
  menuItemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  menuItemPrice: {
    fontSize: 14,
    color: '#666',
  },
  paymentSection: {
    alignItems: 'center',
  },
  paymentImage: {
    width: '100%',
    height: 50,
    resizeMode: 'contain',
  },
  smartCodeText: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
});

export default HomeScreen;
