import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  ScrollView,
  TextInput,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';

interface Store {
  id: number;
  name: string;
}

const initialStores: Store[] = [
  { id: 1, name: '店舗名称a' },
  { id: 2, name: '店舗名称b' },
];

const StoreAuthenticationScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [stores, setStores] = useState<Store[]>(initialStores);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [authKey, setAuthKey] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [showKeyInput, setShowKeyInput] = useState(false);

  const handleApprove = (store: Store) => {
    setSelectedStore(store);
    setShowKeyInput(true);
    setModalVisible(true);
  };

  const verifyKey = () => {
    // 실제 키 검증 로직 (예: API 호출)
    const isValid = authKey === '1234'; // 테스트용 임시 키
    setIsVerified(isValid);
    
    if(isValid) {
      setTimeout(() => {
        setModalVisible(false);
        setSelectedStore(null);
        setAuthKey('');
        setIsVerified(false);
      }, 1500);
    }
  };

  const cancelApprove = () => {
    setModalVisible(false);
    setSelectedStore(null);
    setAuthKey('');
    setIsVerified(false);
    setShowKeyInput(false);
  };

  return (
    <View style={styles.container}>
      {/* 헤더 섹션 */}
      <View style={styles.header}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>LOGO</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>ログアウト</Text>
        </TouchableOpacity>
      </View>

      {/* 컨텐츠 섹션 */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.listTitle}>店舗認証リスト</Text>
        
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderCell, { flex: 0.7 }]}>No</Text>
          <Text style={[styles.tableHeaderCell, { flex: 2 }]}>店舗名称</Text>
          <Text style={[styles.tableHeaderCell, { flex: 1 }]}>管理</Text>
        </View>

        {stores.map((store, idx) => (
          <View style={styles.tableRow} key={store.id}>
            <Text style={[styles.tableCell, { flex: 0.7 }]}>{idx + 1}</Text>
            <Text style={[styles.tableCell, { flex: 2 }]}>{store.name}</Text>
            <TouchableOpacity
              style={styles.approveButton}
              onPress={() => handleApprove(store)}
            >
              <Text style={styles.approveText}>承認</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* 바텀 섹션 */}
      <View style={styles.bottomSection}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>戻る</Text>
        </TouchableOpacity>
      </View>

      {/* 인증 모달 */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={cancelApprove}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {!isVerified ? (
              <>
                <Text style={styles.modalText}>認証キーを入力してください</Text>
                <TextInput
                  style={styles.authInput}
                  value={authKey}
                  onChangeText={setAuthKey}
                  placeholder="認証キー"
                  secureTextEntry
                />
                <View style={styles.modalButtons}>
                  <TouchableOpacity 
                    style={styles.modalVerifyButton} 
                    onPress={verifyKey}>
                    <Text style={styles.modalButtonText}>確認</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.modalNoButton} 
                    onPress={cancelApprove}>
                    <Text style={styles.modalButtonText}>キャンセル</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <Text style={styles.successText}>認証が完了しました</Text>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff' 
  },
  header: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  logo: { 
    backgroundColor: '#ccc', 
    padding: 10, 
    borderRadius: 3 
  },
  logoText: { 
    fontWeight: 'bold', 
    fontSize: 18 
  },
  logoutButton: { 
    backgroundColor: '#e74c3c', 
    padding: 10, 
    borderRadius: 3 
  },
  logoutText: { 
    color: '#fff', 
    fontWeight: 'bold' 
  },
  content: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 80
  },
  listTitle: { 
    fontWeight: 'bold', 
    fontSize: 18, 
    textAlign: 'center', 
    marginVertical: 10 
  },
  tableHeader: { 
    flexDirection: 'row', 
    borderBottomWidth: 1, 
    borderColor: '#bbb', 
    marginBottom: 2 
  },
  tableHeaderCell: { 
    textAlign: 'center', 
    fontWeight: 'bold', 
    paddingVertical: 6 
  },
  tableRow: { 
    flexDirection: 'row', 
    borderBottomWidth: 1, 
    borderColor: '#eee', 
    alignItems: 'center' 
  },
  tableCell: { 
    textAlign: 'center', 
    paddingVertical: 8 
  },
  approveButton: { 
    backgroundColor: '#4CAF50', 
    paddingVertical: 5, 
    paddingHorizontal: 10, 
    borderRadius: 5 
  },
  approveText: { 
    color: '#fff' 
  },
  bottomSection: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  backButton: {
    backgroundColor: '#3498db',
    paddingVertical: 14,
    borderRadius: 5,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  centeredView: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: 'rgba(0,0,0,0.5)' 
  },
  modalView: { 
    backgroundColor: 'white', 
    borderRadius: 5, 
    padding: 20, 
    alignItems: 'center', 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.25, 
    shadowRadius: 4, 
    elevation: 5,
    width: '80%' 
  },
  modalText: { 
    marginBottom: 15, 
    textAlign: 'center',
    fontSize: 16 
  },
  authInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    width: '100%',
    marginBottom: 15
  },
  modalButtons: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    width: '100%' 
  },
  modalVerifyButton: { 
    backgroundColor: '#2196F3', 
    borderRadius: 5, 
    padding: 10, 
    elevation: 2,
    flex: 1,
    marginRight: 10
  },
  modalNoButton: { 
    backgroundColor: '#f44336', 
    borderRadius: 5, 
    padding: 10, 
    elevation: 2,
    flex: 1
  },
  modalButtonText: { 
    color: '#fff', 
    fontWeight: 'bold',
    textAlign: 'center'
  },
  successText: {
    color: '#4CAF50',
    fontSize: 18,
    fontWeight: 'bold',
    padding: 20
  }
});

export default StoreAuthenticationScreen;
