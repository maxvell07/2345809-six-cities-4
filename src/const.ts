
import { City } from '../src/types/city';
import { Offer } from './types/offer';

export const cities: City[] = [
  {
    name: 'Paris',
    location: {
      latitude: 48.8534,
      longitude: 2.3479,
      zoom: 12,
    },
  },

  {
    name: 'Amsterdam',
    location: {
      latitude: 52.37022,
      longitude: 4.89521,
      zoom: 12,
    },
  },

  {
    name: 'Cologne',
    location: {
      latitude: 50.93333,
      longitude: 6.95,
      zoom: 12,
    },
  },
  {
    name: 'Brussels',
    location: {
      latitude: 50.85036,
      longitude: 4.35173,
      zoom: 12,
    },
  },
  {
    name: 'Hamburg',
    location: {
      latitude: 53.5500341,
      longitude: 10.000654,
      zoom: 12,
    },
  },
  {
    name: 'Dusseldorf',
    location: {
      latitude: 51.2217,
      longitude: 6.77617,
      zoom: 12,
    },
  }
];

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum APIRoute {
  Offers = '/offers',
  Login = '/login',
  Logout = '/logout',
  Comments = '/Comments'
}

export const defaultMarker =
  '/img/pin.svg';

export const activeMarker =
  '/img/pin-active.svg';

export const sortWidth = '6';

export const sortHeight = '5';

export const SORT_TYPE = {
  0: 'Popular',
  1: 'Price: low to high',
  2: 'Price: high to low',
  3: 'Top rated first',
};

export const TIMEOUT_SHOW_ERROR = 2000;

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

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export function formatDateForView(dateString: string) {
  const date = new Date(dateString);
  const newDate = `${months[date.getMonth()]} ${date.getFullYear()}`;
  return newDate;
}
