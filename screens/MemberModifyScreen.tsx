import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../App'; // 타입 정의에 따라 경로 조정

interface Member {
  id: number;
  email: string;
  lastActive: string;
  registrationDate?: string;
}

type MemberModifyScreenRouteProp = RouteProp<RootStackParamList, 'MemberModify'>;

const MemberModifyScreen: React.FC = () => {
  const route = useRoute<MemberModifyScreenRouteProp>();
  const navigation = useNavigation();
  const { member } = route.params;

  const [email, setEmail] = useState(member.email);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const inputStyle = {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 12,
    marginBottom: 16,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#f9f9f9',
  };

  const handleSave = () => {
    // 저장 로직 구현
    console.log('저장!');
    navigation.goBack(); // 예시: 저장 후 이전 화면으로 돌아감
  };

  const handleGoBack = () => {
    navigation.goBack(); // 이전 화면으로 돌아감
  };

  const handleDeleteMember = () => {
    // 삭제 로직 구현
    console.log('회원 삭제!');
    navigation.goBack(); // 예시: 삭제 후 이전 화면으로 돌아감
  };

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

      <View style={styles.content}>
        <View style={styles.formBox}>
          <Text style={styles.formTitle}>会員情報修正</Text>

          <View style={styles.row}>
            <View style={styles.col}>
              <Text style={styles.label}>登録日</Text>
              <TextInput
                style={styles.input}
                value={member.registrationDate || 'yyyy/mm/dd/hh:mm'}
                editable={false}
              />
            </View>
            <View style={styles.col}>
              <Text style={styles.label}>活動日</Text>
              <TextInput
                style={styles.input}
                value={member.lastActive || 'yyyy/mm/dd/hh:mm'}
                editable={false}
              />
            </View>
          </View>

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={inputStyle}
            value={email}
            onChangeText={setEmail}
            placeholder="email@email.com"
          />

          <Text style={styles.label}>パスワード</Text>
          <TextInput
            style={inputStyle}
            value={password}
            onChangeText={setPassword}
            placeholder="パスワード"
            secureTextEntry={true}
          />

          <Text style={styles.label}>パスワード確認</Text>
          <TextInput
            style={inputStyle}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="パスワード確認"
            secureTextEntry={true}
          />

          <Text style={styles.label}>会員区分</Text>
          <TextInput
            style={styles.input}
            value="一般会員"
            editable={false}
          />
             <TouchableOpacity style={styles.deleteMemberButton} onPress={handleDeleteMember}>
            <Text style={styles.deleteMemberButtonText}>会員削除</Text>
          </TouchableOpacity>
        </View>
       
      </View>

      <View style={styles.bottomButtons}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>保存</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Text style={styles.backButtonText}>戻る</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  logo: {
    backgroundColor: '#ddd',
    padding: 8,
    borderRadius: 5,
  },
  logoText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  content: {
    flex: 1, // 내용이 화면의 나머지 공간을 채우도록 설정
  },
  formBox: {
    margin: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  formTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  col: {
    flex: 1,
    marginRight: 8,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 12,
    marginBottom: 16,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#f9f9f9',
  },
  deleteMemberButton: {
    backgroundColor: '#e74c3c', // 빨간색
    borderRadius: 20, // 타원형
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10, // Add some spacing
    marginLeft: 16,
    marginRight: 16,
  },
  deleteMemberButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  saveButton: {
    backgroundColor: '#2ecc71',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  backButton: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginLeft: 8,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default MemberModifyScreen;
