import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { ServiceArea } from '../types';

type MapProps = {
  myLat: number;
  myLon: number;
  serviceAreas: ServiceArea[];
  mapRef: React.RefObject<MapView>;
};

export default function Map({ myLat, myLon, serviceAreas, mapRef }: MapProps) {
  return (
    <MapView
      ref={mapRef}
      provider="google"
      style={styles.map}
      initialRegion={{
        latitude: myLat,
        longitude: myLon,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
    >
      <Marker coordinate={{ latitude: myLat, longitude: myLon }} title="現在地" pinColor="red" />
      {serviceAreas.map((area) => (
        <Marker
          key={area.name}
          coordinate={{ latitude: area.latitude, longitude: area.longitude }}
          title={area.name}
          description={area.description}
          pinColor="orange"
        />
      ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
