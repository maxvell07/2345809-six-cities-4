import { City } from './city';
import { Point } from './point';

export type Offer = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: City;
  location: Point;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
};

export type Points = {
  id: string;
  location: Location;
}
export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
}

type Host = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
}

export type ExtendedOffer = Omit<Offer, 'previewImage'> & {
  description: string;
  bedrooms: number;
  goods: string[];
  host: Host;
  maxAdults: number;
  images: string[];
}
