import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MyPageMarketStackParamList } from '../components/MyPageMarketStack'; // MyPageMarketStackParamList 임포트

type NavProp = StackNavigationProp<MyPageMarketStackParamList, 'EventManagement'>;

export default function MyPageScreen_Market_Event() {
  const navigation = useNavigation<NavProp>();
  const [events, setEvents] = useState([
    { id: '1', title: '全商品30%割引イベント', period: '2025.04.01～2025.05.01' },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [toDeleteId, setToDeleteId] = useState<string | null>(null);

  const onPressAdd = () => navigation.navigate('EventUpdate');
  const onPressDelete = (id: string) => {
    setToDeleteId(id);
    setModalVisible(true);
  };
  const confirmDelete = () => {
    setEvents(ev => ev.filter(e => e.id !== toDeleteId));
    setModalVisible(false);
  };

  return (
    <View style={{flex:1, backgroundColor:'#fff'}}>
      <ScrollView contentContainerStyle={{padding:20, paddingBottom:80}}>
        {/* 프로필 */}
        <Ionicons name="person-circle-outline" size={80} color="#333" style={{alignSelf:'center'}}/>
        <Text style={{textAlign:'center', marginVertical:12}}>E‑Mail: 11@devfox.co.jp</Text>

        {/* 이벤트 헤더 */}
        <View style={{ flexDirection:'row', alignItems:'center', borderBottomWidth:2, borderBottomColor:'#007AFF', paddingBottom:8, marginBottom:12 }}>
          <Ionicons name="calendar-outline" size={24}/>
          <Text style={{fontSize:16,fontWeight:'bold',marginHorizontal:8, flex:1}}>이벤트</Text>
          <TouchableOpacity onPress={onPressAdd}>
            <Ionicons name="add-circle-outline" size={28} color="#007AFF"/>
          </TouchableOpacity>
        </View>

        {/* 이벤트 리스트 */}
        {events.map(ev => (
          <View key={ev.id} style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', paddingVertical:12, borderBottomWidth:1, borderBottomColor:'#ddd'}}>
            <View>
              <Text style={{fontSize:14,fontWeight:'600'}}>{ev.title}</Text>
              <Text style={{fontSize:12,color:'#666',marginTop:4}}>{ev.period}</Text>
            </View>
            <TouchableOpacity onPress={() => onPressDelete(ev.id)}>
              <Ionicons name="trash-outline" size={24} color="#999"/>
            </TouchableOpacity>
          </View>
        ))}

        {/* 삭제 확인 모달 */}
        <Modal transparent visible={modalVisible} animationType="fade">
          <View style={{ flex:1, backgroundColor:'rgba(0,0,0,0.3)', justifyContent:'center', alignItems:'center' }}>
            <View style={{ width:'80%', backgroundColor:'#fff', borderRadius:8, padding:20 }}>
              <Text style={{fontSize:16,textAlign:'center'}}>本当に削除しますか？</Text>
              <View style={{ flexDirection:'row', justifyContent:'space-around', marginTop:20 }}>
                <TouchableOpacity onPress={() => setModalVisible(false)} style={{padding:8,backgroundColor:'#eee',borderRadius:6}}>
                  <Text>閉じる</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={confirmDelete} style={{padding:8,backgroundColor:'#d00',borderRadius:6}}>
                  <Text style={{color:'#fff'}}>はい</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
}
