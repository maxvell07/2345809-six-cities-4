import { Offer } from '../types/offer';
import { reviews } from './reviews';
import { cities } from '../const';
import { points } from './points';


export const offers: Offer[] = [
  {
    id: '1',
    title: 'Wood and stone place',
    type: 'room',
    price: 90,
    isFavorite: true,
    isPremium: false,
    rating: 4,
    reviews: [reviews[0]],
    previewImage: ['img/room.jpg'],
    city: cities[0],
    point: points[2]
  },
  {
    id: '2',
    title: 'Beautiful & luxurious studio at great location',
    type: 'apartment',
    price: 130,
    isFavorite: true,
    isPremium: true,
    rating: 4,
    reviews: [reviews[1]],
    previewImage: ['img/apartment-01.jpg'],
    city: cities[1],
    point: points[0]
  },
  {
    id: '3',
    title: 'Canal View Prinsengracht',
    type: 'apartment',
    price: 100,
    isFavorite: false,
    isPremium: false,
    rating: 4,
    reviews: [reviews[2]],
    previewImage: ['img/apartment-02.jpg'],
    city: cities[0],
    point: points[1]
  },
  {
    id: '4',
    title: 'Nice, cozy, warm big bed apartment',
    type: 'apartment',
    price: 150,
    isFavorite: true,
    isPremium: true,
    rating: 5,
    reviews: [reviews[3]],
    previewImage: ['img/apartment-03.jpg'],
    city: cities[2],
    point: points[3]
  },
];
