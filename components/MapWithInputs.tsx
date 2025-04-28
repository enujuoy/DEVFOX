// components/MapWithInputs.tsx
import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import Map from './Map';
import MapView from 'react-native-maps';
import { StoreWithDetails } from '../types'; // ✅ 타입 수정

type MapWithInputsProps = {
  location: { latitude: number; longitude: number };
  radius: number;
  setRadius: (r: number) => void;
  stores: StoreWithDetails[]; // ✅ ServiceArea[] → StoreWithDetails[]
  mapRef: React.RefObject<MapView>;
};

export default function MapWithInputs({
  location,
  radius,
  setRadius,
  stores,
  mapRef,
}: MapWithInputsProps) {
  return (
    <View style={{ flex: 1 }}>
      <TextInput
        style={styles.floatingInput}
        keyboardType="numeric"
        value={radius.toString()}
        onChangeText={(text) => {
          const num = parseInt(text);
          if (!isNaN(num)) setRadius(num);
        }}
        placeholder="반경(m)"
      />
      <Map
        myLat={location.latitude}
        myLon={location.longitude}
        serviceAreas={stores}
        mapRef={mapRef}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  floatingInput: {
    position: 'absolute',
    top: 40,
    right: 20,
    height: 36,
    width: 100,
    backgroundColor: '#ffffffcc',
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 13,
    borderWidth: 1,
    borderColor: '#ccc',
    zIndex: 999,
  },
});
