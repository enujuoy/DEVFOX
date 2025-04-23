import Constants from 'expo-constants';

export const getNearbyStores = async (lat: number, lon: number) => {
  const apiKey = Constants.expoConfig?.extra?.googleMapsApiKey;
  const radius = 1000;

  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lon}&radius=${radius}&type=convenience_store&language=ja&key=${apiKey}`;

  const response = await fetch(url);
  const json = await response.json();

  if (!json.results) return [];

  return json.results.map((place: any) => ({
    name: place.name,
    latitude: place.geometry.location.lat,
    longitude: place.geometry.location.lng,
    address: place.vicinity,
  }));
};
