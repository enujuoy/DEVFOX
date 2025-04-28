import React from 'react';
import { Animated, Text, StyleSheet, TouchableOpacity } from 'react-native';

type PopupProps = {
  text: string;
  opacity?: Animated.Value;
  translateY?: Animated.Value;
  type: 'normal' | 'highlight' | 'event';
  onPress?: () => void; // 🔥 추가
};

export default function Popup({ text, opacity, translateY, type, onPress }: PopupProps) {
  return (
    <Animated.View
      style={[
        type === 'event'
          ? styles.popupEvent
          : type === 'highlight'
          ? styles.popupYellow
          : styles.popupWhite,
        {
          opacity: opacity ?? new Animated.Value(1),
          transform: [{ translateY: translateY ?? new Animated.Value(0) }],
        },
      ]}
    >
      <TouchableOpacity activeOpacity={0.8} onPress={onPress}> {/* 🔥 눌렀을 때 동작 */}
        <Text style={styles.popupText}>{text}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  popupWhite: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
    backgroundColor: '#ffffff99',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#aaa',
    zIndex: 999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  popupYellow: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
    backgroundColor: '#fff89a99',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#aaa',
    zIndex: 998,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  popupEvent: {
    position: 'absolute',
    bottom: 200,
    left: 20,
    right: 20,
    backgroundColor: '#fff2b2cc',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#aaa',
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 6,
  },
  popupText: {
    fontSize: 15,
    lineHeight: 22,
  },
});
