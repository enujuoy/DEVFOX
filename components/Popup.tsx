// components/Popup.tsx
import React from 'react';
import { Animated, Text, StyleSheet } from 'react-native';

type PopupProps = {
  text: string;
  opacity?: Animated.Value;
  translateY?: Animated.Value;
  type: 'normal' | 'highlight' | 'event';
  onPress?: () => void;
};

export default function Popup({ text, opacity, translateY, type, onPress }: PopupProps) {
  const isHighlight = type === 'highlight';
  const isEvent = type === 'event';

  return (
    <Animated.View
      style={[
        isHighlight
          ? styles.popupYellow
          : isEvent
          ? styles.popupBlue
          : styles.popupWhite,
        {
          opacity: opacity ?? new Animated.Value(1),
          transform: [{ translateY: translateY ?? new Animated.Value(0) }],
        },
      ]}
    >
      <Text onPress={onPress} style={styles.popupText}>
        {text}
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  popupWhite: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
    backgroundColor: '#ffffffcc',
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
    zIndex: 999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  popupBlue: {
    position: 'absolute',
    bottom: 150,
    left: 20,
    right: 20,
    backgroundColor: '#cce5ff',
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
  popupText: {
    fontSize: 15,
    lineHeight: 22,
  },
});
