import {Review} from '../types/review';

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
};
