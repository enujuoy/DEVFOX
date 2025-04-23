import React, { useEffect } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import { ServiceArea } from '../types';

type MapProps = {
  myLat: number;
  myLon: number;
  serviceAreas: ServiceArea[];
  mapRef: React.RefObject<MapView>;
};

export default function Map({ myLat, myLon, serviceAreas, mapRef }: MapProps) {
  const region: Region = {
    latitude: myLat,
    longitude: myLon,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  };

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.animateToRegion(region, 1000);
    }
  }, [myLat, myLon]);

  return (
    <MapView
      ref={mapRef}
      provider="google"
      style={styles.map}
      initialRegion={region}
    >
      <Marker coordinate={{ latitude: myLat, longitude: myLon }} title="現在地" pinColor="red" />
      {serviceAreas.map((store, idx) => (
      <Marker
        key={idx}
        coordinate={{ latitude: store.latitude, longitude: store.longitude }}
        title={store.name}
        description={store.address}
        pinColor="green"
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
