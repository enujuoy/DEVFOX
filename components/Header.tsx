import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';

type HeaderProps = {
  navigation: NavigationProp<RootStackParamList>;
};

const Header: React.FC<HeaderProps> = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleLogout = () => {
    Alert.alert(
      '로그아웃',
      '로그아웃 하시겠습니까?',
      [
        {
          text: '취소',
          style: 'cancel',
        },
        {
          text: '확인',
          onPress: () => {
            console.log('로그아웃됨');
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleMypage = () => {
    navigation.navigate('Mypage');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>LOGO</Text>

      <View style={styles.rightButtons}>
        <TouchableOpacity style={styles.button} onPress={handleMypage}>
          <Text style={styles.buttonText}>Mypage</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#0080A0' }]}
          onPress={handleLogout}
        >
          <Text style={[styles.buttonText, { color: '#fff' }]}>ログアウト</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  logo: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  rightButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
  },
  buttonText: {
    fontSize: 14,
  },
});
