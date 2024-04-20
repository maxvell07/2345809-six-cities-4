import {Review} from '../types/review';
import { City } from './city';
import { Point } from './point';

export type Offer = {
  id: string;
  title: string;
  previewImage: [string];
  price: number;
  type: string;
  isFavorite: boolean;
  rating: number;
  reviews: Review [];
  isPremium: boolean;
  city:City;
  point:Point;
};
