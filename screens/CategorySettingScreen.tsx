import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import ToggleButton from '../components/ToggleButton';
import { menuCategories, amenityCategories } from '../constants/categoryOption';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

export default function CategorySettingScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [activeTab, setActiveTab] = useState<'menu' | 'amenity'>('menu');
  const [selected, setSelected] = useState<string[]>([]);

  const categories = activeTab === 'menu' ? menuCategories : amenityCategories;

  const toggleCategory = (item: string) => {
    setSelected((prev) =>
      prev.includes(item)
        ? prev.filter((i) => i !== item)
        : [...prev, item]
    );
  };

  const handleSubmit = () => {
    console.log('選択カテゴリ:', selected);
    navigation.navigate('Map');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>カテゴリ設定</Text>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'menu' && styles.activeTab]}
          onPress={() => setActiveTab('menu')}
        >
          <Text style={styles.tabText}>メニュー</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'amenity' && styles.activeTab]}
          onPress={() => setActiveTab('amenity')}
        >
          <Text style={styles.tabText}>アメニティ</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subTitle}>
        {activeTab === 'menu' ? 'メニュー' : 'アメニティ'}
      </Text>

      <ScrollView contentContainerStyle={styles.grid}>
        {categories.map((item) => (
          <ToggleButton
            key={item}
            label={item}
            selected={selected.includes(item)}
            onPress={() => toggleCategory(item)}
          />
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>設定</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60, paddingHorizontal: 20 },
  title: { fontSize: 18, textAlign: 'center', marginBottom: 16 },
  tabContainer: { flexDirection: 'row', justifyContent: 'center', marginBottom: 10 },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    backgroundColor: '#fff',
  },
  activeTab: {
    backgroundColor: '#eee',
    borderColor: '#666',
  },
  tabText: { fontSize: 15 },
  subTitle: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingBottom: 80,
  },
  submitButton: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    padding: 14,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    alignItems: 'center',
  },
  submitText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
