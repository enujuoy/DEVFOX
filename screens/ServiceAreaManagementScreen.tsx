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

interface ServiceArea {
  id: number;
  name: string;
  address: string;
  registeredAt: string;
}

const initialAreas: ServiceArea[] = [
  { id: 1, name: 'サービスエリア名称a', address: '東京都ＡＡＡＡＡＡＡＡ', registeredAt: '2024/04/01' },
  { id: 2, name: 'サービスエリア名称b', address: '東京都ＢＢＢＢＢＢＢＢ', registeredAt: '2024/04/02' },
];

const ServiceAreaManagementScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [areas, setAreas] = useState<ServiceArea[]>(initialAreas);
  const [selectedArea, setSelectedArea] = useState<ServiceArea | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [editedAddress, setEditedAddress] = useState('');
  const [deleteModal, setDeleteModal] = useState(false);

  // 핸들러 함수들 유지
  const handleEdit = (area: ServiceArea) => {
    setSelectedArea(area);
    setEditedName(area.name);
    setEditedAddress(area.address);
    setEditMode(true);
  };

  const handleSave = () => {
    if (selectedArea) {
      setAreas(areas.map(area =>
        area.id === selectedArea.id
          ? { ...area, name: editedName, address: editedAddress }
          : area
      ));
      setEditMode(false);
      setSelectedArea(null);
    }
  };

  const handleDelete = () => setDeleteModal(true);
  const confirmDelete = () => {
    if (selectedArea) {
      setAreas(areas.filter(area => area.id !== selectedArea.id));
      setDeleteModal(false);
      setEditMode(false);
      setSelectedArea(null);
    }
  };
  const cancelDelete = () => setDeleteModal(false);
  const handleCancel = () => {
    setEditMode(false);
    setSelectedArea(null);
  };

  return (
    <View style={styles.container}>
      {/* 1. 헤더 영역 */}
      <View style={styles.header}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>LOGO</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>ログアウト</Text>
        </TouchableOpacity>
      </View>

      {/* 2. 컨텐츠 영역 */}
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
      >
        {!editMode ? (
          <>
            <Text style={styles.listTitle}>サービスエリアリスト</Text>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderCell, { flex: 0.7 }]}>No</Text>
              <Text style={[styles.tableHeaderCell, { flex: 2 }]}>サービスエリア</Text>
              <Text style={[styles.tableHeaderCell, { flex: 1 }]}>管理</Text>
            </View>
            {areas.map((area, idx) => (
              <View style={styles.tableRow} key={area.id}>
                <Text style={[styles.tableCell, { flex: 0.7 }]}>{idx + 1}</Text>
                <Text style={[styles.tableCell, { flex: 2 }]}>{area.name}</Text>
                <TouchableOpacity 
                  style={styles.editButton} 
                  onPress={() => handleEdit(area)}
                >
                  <Text style={styles.editText}>修正</Text>
                </TouchableOpacity>
              </View>
            ))}
          </>
        ) : (
          <View style={styles.editForm}>
            <Text style={styles.formTitle}>サービスエリア情報修正</Text>
            <View style={styles.formRow}>
              <Text style={styles.formLabel}>登録日</Text>
              <Text style={styles.formValue}>{selectedArea?.registeredAt}</Text>
            </View>
            <View style={styles.formRow}>
              <Text style={styles.formLabel}>名称</Text>
              <TextInput
                style={styles.input}
                value={editedName}
                onChangeText={setEditedName}
              />
            </View>
            <View style={styles.formRow}>
              <Text style={styles.formLabel}>住所</Text>
              <TextInput
                style={styles.input}
                value={editedAddress}
                onChangeText={setEditedAddress}
              />
            </View>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={handleDelete}
            >
              <Text style={styles.deleteText}>情報削除</Text>
            </TouchableOpacity>
            <View style={styles.editFormButtons}>
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>保存</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                <Text style={styles.cancelButtonText}>戻る</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>

      {/* 3. 바텀 영역 */}
      {!editMode && (
        <View style={styles.bottomSection}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>戻る</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* 삭제 모달 */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={deleteModal}
        onRequestClose={cancelDelete}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity style={styles.modalClose} onPress={cancelDelete}>
              <Text style={styles.modalCloseText}>×</Text>
            </TouchableOpacity>
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
  // 컨테이너
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },

  // 헤더
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

  // 컨텐츠 영역
  content: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 80,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },

  // 테이블 스타일
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingHorizontal: 16,
  },
  tableHeaderCell: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: '#fff',
    marginBottom: 8,
    borderRadius: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    paddingHorizontal: 16,
  },
  tableCell: {
    textAlign: 'center',
    paddingHorizontal: 4,
  },
  editButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#3498db',
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  editText: {
    color: '#3498db',
    fontWeight: 'bold',
  },

  // 수정 폼
  editForm: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    margin: 16,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  formRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  formLabel: {
    width: 80,
    fontWeight: 'bold',
  },
  formValue: {
    flex: 1,
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 12,
    backgroundColor: '#f9f9f9',
  },
  deleteButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e74c3c',
    borderRadius: 5,
    padding: 12,
    alignItems: 'center',
    marginVertical: 16,
  },
  deleteText: {
    color: '#e74c3c',
    fontWeight: 'bold',
  },
  editFormButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: '#3498db',
    borderRadius: 5,
    padding: 12,
    flex: 1,
    marginRight: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cancelButton: {
    backgroundColor: '#95a5a6',
    borderRadius: 5,
    padding: 12,
    flex: 1,
    marginLeft: 10,
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  // 바텀 영역
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

  // 모달 스타일
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalClose: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
  },
  modalCloseText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 18,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalYesButton: {
    backgroundColor: '#e74c3c',
    borderRadius: 5,
    padding: 10,
    flex: 1,
    marginRight: 10,
  },
  modalNoButton: {
    backgroundColor: '#95a5a6',
    borderRadius: 5,
    padding: 10,
    flex: 1,
    marginLeft: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ServiceAreaManagementScreen;
