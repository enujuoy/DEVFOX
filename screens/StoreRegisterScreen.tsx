import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function StoreRegisterScreen() {
  const [storeName, setStoreName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [description, setDescription] = useState('');
  const [selectedService, setSelectedService] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>店舗登録・管理</Text>

      <TextInput
        style={styles.input}
        placeholder="店舗名を入力してください"
        value={storeName}
        onChangeText={setStoreName}
      />

      <TextInput
        style={styles.input}
        placeholder="電話番号を入力してください"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />

      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="店舗紹介を入力してください。"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={selectedService}
          onValueChange={(itemValue) => setSelectedService(itemValue)}
        >
          <Picker.Item label="サービスエリアを選択してください" value="" />
          <Picker.Item label="海老名 SA" value="ebina" />
          <Picker.Item label="石川 IPA" value="ishikawa" />
          <Picker.Item label="三芳 PA" value="miyoshi" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>作成</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 6,
    padding: 10, marginBottom: 15
  },
  pickerWrapper: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 6, marginBottom: 20
  },
  button: {
    backgroundColor: '#007AFF', padding: 15, borderRadius: 8, alignItems: 'center'
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
