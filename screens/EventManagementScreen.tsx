import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';

interface Event {
  id: number;
  name: string;
}

const initialEvents: Event[] = [
  { id: 1, name: 'イベントa' },
  { id: 2, name: 'イベントb' },
];

const EventManagementScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleDelete = (event: Event) => {
    setSelectedEvent(event);
    setModalVisible(true);
  };

  const confirmDelete = () => {
    if (selectedEvent) {
      setEvents(events.filter(event => event.id !== selectedEvent.id));
      setModalVisible(false);
      setSelectedEvent(null);
    }
  };

  const cancelDelete = () => {
    setModalVisible(false);
    setSelectedEvent(null);
  };

  return (
    <View style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>LOGO</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>ログアウト</Text>
        </TouchableOpacity>
      </View>

      {/* 리스트 */}
      <Text style={styles.listTitle}>イベント情報リスト</Text>
      <View style={styles.tableHeader}>
        <Text style={[styles.tableHeaderCell, { flex: 0.7 }]}>No</Text>
        <Text style={[styles.tableHeaderCell, { flex: 2 }]}>イベント情報</Text>
        <Text style={[styles.tableHeaderCell, { flex: 1 }]}>管理</Text>
      </View>
      {events.map((event, idx) => (
        <View style={styles.tableRow} key={event.id}>
          <Text style={[styles.tableCell, { flex: 0.7 }]}>{idx + 1}</Text>
          <Text style={[styles.tableCell, { flex: 2 }]}>{event.name}</Text>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDelete(event)}
          >
            <Text style={styles.deleteText}>削除</Text>
          </TouchableOpacity>
        </View>
      ))}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>戻る</Text>
      </TouchableOpacity>

      {/* 삭제 확인 모달 */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={cancelDelete}
      >
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
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  logo: { backgroundColor: '#ccc', padding: 10, borderRadius: 3 },
  logoText: { fontWeight: 'bold', fontSize: 18 },
  logoutButton: { backgroundColor: '#3498db', padding: 10, borderRadius: 5 },
  logoutText: { color: '#fff', fontWeight: 'bold' },
  listTitle: { fontWeight: 'bold', fontSize: 20, textAlign: 'center', marginVertical: 15 },
  tableHeader: { flexDirection: 'row', borderBottomWidth: 1, borderColor: '#bbb', marginBottom: 2, marginTop: 10 },
  tableHeaderCell: { textAlign: 'center', fontWeight: 'bold', paddingVertical: 6, fontSize: 15 },
  tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderColor: '#eee', alignItems: 'center', minHeight: 40 },
  tableCell: { textAlign: 'center', paddingVertical: 8, fontSize: 15 },
  deleteButton: { backgroundColor: '#e74c3c', paddingVertical: 5, paddingHorizontal: 15, borderRadius: 5, alignItems: 'center', justifyContent: 'center' },
  deleteText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  backButton: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#888', borderRadius: 3, padding: 12, marginTop: 30, alignSelf: 'center', width: 120, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 2, elevation: 2 },
  backButtonText: { color: '#333', textAlign: 'center', fontWeight: 'bold' },
  centeredView: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalView: { backgroundColor: 'white', borderRadius: 5, padding: 20, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5 },
  modalText: { marginBottom: 15, textAlign: 'center', fontSize: 16 },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-around', width: '100%' },
  modalYesButton: { backgroundColor: '#2196F3', borderRadius: 5, padding: 10, elevation: 2, minWidth: 70, alignItems: 'center' },
  modalNoButton: { backgroundColor: '#f44336', borderRadius: 5, padding: 10, elevation: 2, minWidth: 70, alignItems: 'center' },
  modalButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});

export default EventManagementScreen;
