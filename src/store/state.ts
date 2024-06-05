import {store} from '.';
import { AuthorizationStatus } from '../const';
import { ExtendedOffer, Offer } from '../types/offer';
import { Review } from '../types/review';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;


export type UserState = {
  authorizationStatus: AuthorizationStatus;
  userEmail: string | null;
};

export type OffersState = {
  currentOffer: {
    offerInfo: ExtendedOffer | null;
    nearestOffers: Offer[];
    reviews: Review[];
  };
  offers: Offer[];
  selectedMarker: {
    id: string;
  } | null;
  isOffersDataLoading: boolean;
  isSelectedDataLoading: boolean;
  favorites: Offer[];
  hasError: boolean;
};

export type OtherState = {
  city: string;
  sortType: string;
  error: string | null;
};
