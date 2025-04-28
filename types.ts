// types.ts
export type ServiceArea = {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  description: string;
  serviceAreaCode: string;
  storeCode: string;
};

export type Location = {
  latitude: number;
  longitude: number;
};

export type NearbyStore = {
  placeId: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
};

export type StoreEvent = {
  title: string;
  description: string;
  image?: string;
  date?: any;
};

export type StoreWithDetails = NearbyStore & {
  description: string;
  amenities?: string[];
  menu?: string[];
  event?: StoreEvent;
  serviceAreaCode?: string;
  storeCode?: string;
  name? : string;
};

export type UserPreferences = {
  selectedAmenities: string[];
  selectedMenus: string[];
};
