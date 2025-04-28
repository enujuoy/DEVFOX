// screens/StoreDetailsScreen.tsx

import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';

import { useRoute, RouteProp } from '@react-navigation/native';
import { db } from '../firebaseConfig';
import { RootStackParamList } from '../App';

type StoreDetailsRouteProp = RouteProp<RootStackParamList, 'StoreDetails'>;

// 메뉴 데이터 타입 정의
type MenuItemData = {
  productName: string;
  price: string;
};

// 개별 메뉴 아이템 표시 컴포넌트
type MenuItemProps = {
  name: string;
  price: string;
};

const MenuItem = ({ name, price }: MenuItemProps) => (
  <View style={styles.menuItem}>
    <Text style={styles.menuItemName}>{name}</Text>
    <Text style={styles.menuItemPrice}>{price}円</Text>
  </View>
);

const StoreDetailsScreen = () => {
  const { storeCode, name } = useRoute<StoreDetailsRouteProp>().params;
  const [menuItems, setMenuItems] = useState<MenuItemData[]>([]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const q = query(
          collection(db, 'menuItems'),
          where('storeCode', '==', storeCode),
          orderBy('createdAt', 'desc')
        );
        const snapshot = await getDocs(q);
        const items = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            productName: data.productName,
            price: data.price,
          };
        });
        setMenuItems(items);
      } catch (error) {
        console.error('メニュー取得エラー:', error);
      }
    };
    fetchMenu();
  }, [storeCode]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>{name} メニュー一覧</Text>
      {menuItems.map((item, idx) => (
        <MenuItem key={idx} name={item.productName} price={item.price} />
      ))}
    </ScrollView>
  );
};

export default StoreDetailsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  menuItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  menuItemName: {
    fontSize: 16,
    fontWeight: '600',
  },
  menuItemPrice: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});
