import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';

interface Member {
  id: number;
  email: string;
  lastActive: string;
  registrationDate?: string;
}

type MemberManagementScreenProps = {
  navigation: NavigationProp<RootStackParamList>;
};

const MemberManagementScreen: React.FC<MemberManagementScreenProps> = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [members, setMembers] = React.useState<Member[]>([
    { id: 1, email: 'email1@gmail.com', lastActive: '2024/04/01/10:00', registrationDate: '2024/01/01/09:00' },
    { id: 2, email: 'email2@gmail.com', lastActive: '2024/04/02/11:00', registrationDate: '2024/01/02/09:00' },
  ]);
  const [selectedMember, setSelectedMember] = React.useState<Member | null>(null);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalType, setModalType] = React.useState<'save' | 'delete'>('save');

  const handleDelete = (member: Member) => {
    setSelectedMember(member);
    setModalVisible(true);
    setModalType('delete');
  };

  const confirmDelete = () => {
    if (selectedMember) {
      const updatedMembers = members.filter((member) => member.id !== selectedMember.id);
      setMembers(updatedMembers);
      setSelectedMember(null);
      setModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* 헤더 영역 */}
      <View style={styles.header}>
        <View style={styles.logo}><Text style={styles.logoText}>LOGO</Text></View>
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>ログアウト</Text>
        </TouchableOpacity>
      </View>

      {/* 컨텐츠 영역 */}
      <ScrollView style={styles.content}>
        <Text style={styles.listTitle}>会員リスト</Text>
        <View style={styles.listContainer}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableColumnHeader}>No</Text>
            <Text style={styles.tableColumnHeader}>Email</Text>
            <Text style={styles.tableColumnHeader}>最近活動日</Text>
            <Text style={styles.tableColumnHeader}>管理</Text>
          </View>
          {members.map((member) => (
            <View style={styles.tableRow} key={member.id}>
              <Text style={styles.tableCell}>{member.id}</Text>
              <Text style={styles.tableCell} numberOfLines={2}>{member.email}</Text>
              <Text style={styles.tableCell}>{member.lastActive}</Text>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => navigation.navigate('MemberModify', { member })}
              >
                <Text style={styles.editText}>修正</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* 하단 버튼 영역 */}
      <View style={styles.bottomButtonContainer}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>戻る</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>削除しますか？</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalConfirmButton}
                onPress={confirmDelete}
              >
                <Text style={styles.buttonText}>はい</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalCancelButton}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.buttonText}>いいえ</Text>
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
    flex: 1,
    padding: 16,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  listContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tableColumnHeader: {
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  tableCell: {
    flex: 1,
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalConfirmButton: {
    backgroundColor: '#2ecc71',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalCancelButton: {
    backgroundColor: '#95a5a6',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  bottomButtonContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
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
  }
});

export default MemberManagementScreen;
