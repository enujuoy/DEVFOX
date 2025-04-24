// screens/EventUpdateScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  StyleSheet,
  Alert,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import * as DocumentPicker from 'expo-document-picker';
import { StackScreenProps } from '@react-navigation/stack';
import { format } from 'date-fns';
import { MyPageMarketStackParamList } from '../components/MyPageTab_Market';

type Props = StackScreenProps<MyPageMarketStackParamList, 'EventManagement'>;

export default function EventUpdateScreen({ navigation }: Props) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [fileName, setFileName] = useState('');

  // 📎 파일 첨부 함수 개선 (type 오류 제거)
  const pickFile = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({});
      if (!res.canceled && res.assets?.length > 0) {
        setFileName(res.assets[0].name);
      } else {
        console.log('파일 선택 취소 또는 없음');
      }
    } catch (e: any) {
      Alert.alert('파일 선택 중 예외가 발생했습니다.', e.message);
    }
  };

  // 🛠 유효성 검사 추가 및 포맷
  const onCreate = () => {
    if (!title.trim()) {
      Alert.alert('이벤트명을 입력해주세요.');
      return;
    }
    if (startDate > endDate) {
      Alert.alert('시작일은 종료일보다 빠르거나 같아야 합니다.');
      return;
    }

    const formattedStart = format(startDate, 'yyyy-MM-dd');
    const formattedEnd = format(endDate, 'yyyy-MM-dd');

    console.log('전송할 데이터:', {
      title,
      desc,
      fileName,
      period: `${formattedStart} ~ ${formattedEnd}`,
    });

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* 📅 날짜 선택 */}
      <View style={styles.dateRow}>
        <TouchableOpacity onPress={() => setShowStart(true)}>
          <Text>{format(startDate, 'yyyy.MM.dd')}</Text>
        </TouchableOpacity>
        <Text> 〜 </Text>
        <TouchableOpacity onPress={() => setShowEnd(true)}>
          <Text>{format(endDate, 'yyyy.MM.dd')}</Text>
        </TouchableOpacity>
      </View>
      <DateTimePickerModal
        isVisible={showStart}
        mode="date"
        date={startDate}
        onConfirm={(d) => {
          setStartDate(d);
          setShowStart(false);
        }}
        onCancel={() => setShowStart(false)}
        minimumDate={new Date()} // 오늘 이전 선택 불가
      />
      <DateTimePickerModal
        isVisible={showEnd}
        mode="date"
        date={endDate}
        onConfirm={(d) => {
          setEndDate(d);
          setShowEnd(false);
        }}
        onCancel={() => setShowEnd(false)}
        minimumDate={startDate} // 시작일 이전 선택 불가
      />

      {/* 📝 제목·설명 입력 */}
      <TextInput
        style={styles.input}
        placeholder="이벤트 명"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="이벤트 설명"
        value={desc}
        onChangeText={setDesc}
        multiline
      />

      {/* 📎 파일 첨부 */}
      <TouchableOpacity style={styles.uploadBtn} onPress={pickFile}>
        <Text>파일 첨부</Text>
      </TouchableOpacity>
      {fileName ? <Text style={{ marginBottom: 12 }}>{fileName}</Text> : null}

      {/* 🎯 버튼 */}
      <View style={styles.btnRow}>
        <Button title="作成" onPress={onCreate} />
        <Button title="戻る" color="#999" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 8,
    marginBottom: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  uploadBtn: {
    padding: 12,
    backgroundColor: '#007AFF',
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 8,
  },
  btnRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 24,
  },
});
