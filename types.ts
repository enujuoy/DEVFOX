// types.ts

export type ServiceArea = {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  description: string; // ✅ 반드시 있어야 함
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
  date: number;
};

export type StoreWithDetails = NearbyStore & {
  description: string;
  amenities?: string[];
  menu?: string[];
  event?: {
    title: string;
    description: string;
    image?: string;
    date?: any;
  };
  storeCode: string; // ✅ storeCode 추가
};

export type UserPreferences = {
  selectedAmenities: string[];
  selectedMenus: string[];
};
