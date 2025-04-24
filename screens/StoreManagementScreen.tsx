import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Modal,
  ScrollView,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';

interface Store {
  id: number;
  name: string;
  email: string;
  registeredAt: string;
  lastActive: string;
}

const initialStores: Store[] = [
  { id: 1, name: '店舗名称a', email: 'email1@gmail.com', registeredAt: '2024/04/01', lastActive: '2024/04/05' },
  { id: 2, name: '店舗名称b', email: 'email2@gmail.com', registeredAt: '2024/04/02', lastActive: '2024/04/06' },
];

const StoreManagementScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [stores, setStores] = useState<Store[]>(initialStores);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editedEmail, setEditedEmail] = useState('');
  const [editedName, setEditedName] = useState('');
  const [editedPassword, setEditedPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleEdit = (store: Store) => {
    setSelectedStore(store);
    setEditedEmail(store.email);
    setEditedName(store.name);
    setEditMode(true);
  };

  const handleSave = () => {
    if (selectedStore) {
      setStores(stores.map(store =>
        store.id === selectedStore.id
          ? { ...store, name: editedName, email: editedEmail }
          : store
      ));
      setEditMode(false);
      setSelectedStore(null);
    }
  };

  const handleDelete = () => setModalVisible(true);
  const confirmDelete = () => {
    if (selectedStore) {
      setStores(stores.filter(store => store.id !== selectedStore.id));
      setModalVisible(false);
      setEditMode(false);
      setSelectedStore(null);
    }
  };
  const cancelDelete = () => setModalVisible(false);
  const handleCancel = () => {
    setEditMode(false);
    setSelectedStore(null);
  };

  return (
    <View style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <View style={styles.logo}><Text style={styles.logoText}>LOGO</Text></View>
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>ログアウト</Text>
        </TouchableOpacity>
      </View>

      {/* 컨텐츠 */}
      {!editMode ? (
        <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
          <Text style={styles.listTitle}>店舗リスト</Text>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderCell, { flex: 0.7 }]}>No</Text>
            <Text style={[styles.tableHeaderCell, { flex: 2 }]}>店舗名称</Text>
            <Text style={[styles.tableHeaderCell, { flex: 1 }]}>管理</Text>
          </View>
          {stores.map((store, idx) => (
            <View style={styles.tableRow} key={store.id}>
              <Text style={[styles.tableCell, { flex: 0.7 }]}>{idx + 1}</Text>
              <Text style={[styles.tableCell, { flex: 2 }]}>{store.name}</Text>
              <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(store)}>
                <Text style={styles.editText}>修正</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      ) : (
        <View style={styles.editForm}>
          <ScrollView contentContainerStyle={styles.formContent}>
            <Text style={styles.formTitle}>店舗情報修正</Text>
            <View style={styles.formRow}>
              <Text style={styles.formLabel}>登録日</Text>
              <Text style={styles.formValue}>{selectedStore?.registeredAt}</Text>
            </View>
            <View style={styles.formRow}>
              <Text style={styles.formLabel}>活動日</Text>
              <Text style={styles.formValue}>{selectedStore?.lastActive}</Text>
            </View>
            <View style={styles.formRow}>
              <Text style={styles.formLabel}>EMAIL</Text>
              <TextInput style={styles.input} value={editedEmail} onChangeText={setEditedEmail} />
            </View>
            <View style={styles.formRow}>
              <Text style={styles.formLabel}>店舗名称</Text>
              <TextInput style={styles.input} value={editedName} onChangeText={setEditedName} />
            </View>
            <View style={styles.formRow}>
              <Text style={styles.formLabel}>パスワード</Text>
              <TextInput 
                style={styles.input} 
                secureTextEntry 
                value={editedPassword} 
                onChangeText={setEditedPassword} 
              />
            </View>
            <View style={styles.formRow}>
              <Text style={styles.formLabel}>パスワード認証</Text>
              <TextInput 
                style={styles.input} 
                secureTextEntry 
                value={passwordConfirm} 
                onChangeText={setPasswordConfirm} 
              />
            </View>
            <View style={styles.formRow}>
              <Text style={styles.formLabel}>会員区分</Text>
              <Text style={styles.formValue}>店舗主</Text>
            </View>
            <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
              <Text style={styles.deleteText}>会員削除</Text>
            </TouchableOpacity>
          </ScrollView>

          {/* 하단 고정 버튼 */}
          <View style={styles.formFooter}>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>保存</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
              <Text style={styles.cancelButtonText}>戻る</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* 바텀 버튼 */}
      {!editMode && (
        <View style={styles.bottomSection}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>戻る</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* 모달 */}
      <Modal transparent visible={modalVisible} onRequestClose={cancelDelete}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>削除しますか？</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalYesButton} onPress={confirmDelete}>
                <Text style={styles.modalButtonText}>はい</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalNoButton} onPress={cancelDelete}>
                <Text style={styles.modalButtonText}>いいえ</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
    borderRadius: 3,
  },
  logoText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 3,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 80,
    paddingTop: 8,
  },
  listTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#bbb',
    marginBottom: 2,
  },
  tableHeaderCell: {
    textAlign: 'center',
    fontWeight: 'bold',
    paddingVertical: 6,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#eee',
    alignItems: 'center',
  },
  tableCell: {
    textAlign: 'center',
    paddingVertical: 8,
  },
  editButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 3,
    paddingVertical: 4,
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  editText: {
    color: '#333',
    fontWeight: 'bold',
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
    borderRadius: 5,
    padding: 12,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  editForm: {
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 5,
    padding: 16,
    margin: 16,
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'space-between'
  },
  formContent: {
    flexGrow: 1,
    paddingBottom: 20
  },
  formFooter: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  formTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  formRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  formLabel: {
    width: 120,
    fontWeight: 'bold',
  },
  formValue: {
    flex: 1,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 3,
    padding: 8,
    backgroundColor: '#fff',
  },
  deleteButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e74c3c',
    borderRadius: 3,
    padding: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  deleteText: {
    color: '#e74c3c',
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#3498db',
    borderWidth: 1,
    borderColor: '#2980b9',
    borderRadius: 5,
    padding: 12,
    width: 120,
    alignItems: 'center'
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  cancelButton: {
    backgroundColor: '#f1f1f1',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 12,
    width: 120,
    alignItems: 'center'
  },
  cancelButtonText: {
    color: '#333',
    fontWeight: 'bold'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 24,
    alignItems: 'center',
    width: 300,
    elevation: 5,
  },
  modalText: {
    marginBottom: 20,
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  modalYesButton: {
    backgroundColor: '#bfe6f9',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 24,
    marginHorizontal: 8,
  },
  modalNoButton: {
    backgroundColor: '#bfe6f9',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 24,
    marginHorizontal: 8,
  },
  modalButtonText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 16,
  }
});

export default StoreManagementScreen;


