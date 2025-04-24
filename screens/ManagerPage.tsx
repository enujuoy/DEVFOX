import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';

type ManagerPageProps = {
  navigation: NavigationProp<RootStackParamList>;
};

const ManagerPage: React.FC<ManagerPageProps> = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>LOGO</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>ログアウト</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('MemberManagement')}
        >
          <Text style={styles.buttonText}>会員管理</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ServiceAreaManagement')}
        >
          <Text style={styles.buttonText}>サービスエリア管理</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('StoreManagement')}
        >
          <Text style={styles.buttonText}>店舗管理</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('StoreAuthentication')}
        >
          <Text style={styles.buttonText}>店舗認証</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('EventManagement')}
        >
          <Text style={styles.buttonText}>イベント管理</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 3,
    marginRight: 10, // Added some spacing
  },
  logoText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 3,
    marginLeft: 10, // Added some spacing
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    backgroundColor: '#fff', // White button background
    padding: 15,
    marginBottom: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    elevation: 3, // Add shadow
  },
  buttonText: {
    fontSize: 18,
    color: '#333', // Dark gray button text
  },
});

export default ManagerPage;
