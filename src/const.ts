
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
export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offers = '/offer/:id'
}


export enum APIRoute {
  Offers = '/offers',
  Login = '/login',
  Logout = '/logout',
  Comments = '/Comments',
  Favorite = '/favorite'
}
export enum FavouriteStatus {
  Add = 1,
  Remove = 0,
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

export const randomCity = ['Amsterdam', 'Paris', 'Cologne', 'Brussels', 'Hamburg', 'Dusseldorf'];

export function formatDateForView(dateString: string) {
  const date = new Date(dateString);
  const newDate = `${months[date.getMonth()]} ${date.getFullYear()}`;
  return newDate;
}

export enum NameSpace {
  Other = 'OTHER',
  Offers = 'OFFERS',
  User = 'USER',
}

export const updateOffer = (offers: Offer[], updatedOffer: Offer) => {
  const offerIndex = offers.findIndex((el) => el.id === updatedOffer.id);
  if (offerIndex !== -1) {
    offers[offerIndex] = updatedOffer;
  }
};

export const cardTypeMap = new Map ([
  ['typical', 'cities__card place-card'],
  ['near', 'near-places__card place-card'],
  ['favorite', 'favorites__card place-card']
]);

export const NEAREST_COUNT = 3;
export const COMMENT_COUNT = 10;
