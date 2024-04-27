
import { City } from '../src/types/city';
import { Offer } from './types/offer';

export const cities: City[] = [
  {
    name: 'Paris',
    lat: 48.8534,
    lng: 2.3479
  },
  {
    name: 'Amsterdam',
    lat: 52.37022,
    lng: 4.89521
  },
  {
    name: 'Cologne',
    lat: 50.93333,
    lng: 6.95
  },
  {
    name: 'Brussels',
    lat: 50.85036,
    lng: 4.35173
  },
  {
    name: 'Hamburg',
    lat: 53.5753,
    lng: 10.015
  },
  {
    name: 'Dusseldorf',
    lat: 51.2217,
    lng: 6.77617
  }
];

//const Settings = {
//  placesCount: 90,
//} as const;
//export default Settings;

export const defaultMarker =
  'public/img/pin.svg';

export const activeMarker =
  'public/img/pin-active.svg';

export const sortWidth = '6';

export const sortHeight = '5';

export const SORT_TYPE = {
  0: 'Popular',
  1: 'Price: low to high',
  2: 'Price: high to low',
  3: 'Top rated first',
};

export const sorting = (
  offers: Offer[],
  sortType: string
): Offer[] | never => {
  const offersCopy = offers.slice();

  switch (sortType) {
    case 'Popular':
      return offersCopy;
    case 'Price: low to high':
      return offersCopy.sort((offerA, offerB) => offerA.price - offerB.price);
    case 'Price: high to low':
      return offersCopy.sort((offerA, offerB) => offerB.price - offerA.price);
    case 'Top rated first':
      return offersCopy.sort((offerA, offerB) => offerB.rating - offerA.rating);
    default:
      throw new Error('Non-existent sort type');
  }
};
