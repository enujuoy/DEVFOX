import React from 'react';
import { Animated, Text, StyleSheet } from 'react-native';

type PopupProps = {
  text: string;
  opacity: Animated.Value;
  translateY: Animated.Value;
  type: 'normal' | 'highlight';
};

export default function Popup({ text, opacity, translateY, type }: PopupProps) {
  const isHighlight = type === 'highlight';
  return (
    <Animated.View
      style={[
        isHighlight ? styles.popupYellow : styles.popupWhite,
        { opacity, transform: [{ translateY }] },
      ]}
    >
      <Text style={styles.popupText}>{text}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  popupWhite: {
    position: 'absolute',
    bottom: 200,
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
  popupText: {
    fontSize: 15,
    lineHeight: 22,
  },
});
