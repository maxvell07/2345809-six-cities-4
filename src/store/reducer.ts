import {createReducer} from '@reduxjs/toolkit';
import { ExtendedOffer, Offer } from '../types/offer';
import { City } from '../types/city';
import { cities } from '../const';
import {
  ChangeCity,
  sortTypeSelector,
  highlightMarker,
  loadOffers,
  setError,
  requireAuthorization,
  setOffersDataLoadingStatus,
  saveEmail,
  loadOfferData,
  sendReview
} from './action';
import {AuthorizationStatus} from '../const';
import { Review } from '../types/review';

type StateType = {
  currentOffer: {
    offerInfo: ExtendedOffer | undefined;
    nearestOffers: Offer[];
    reviews: Review[];
  };
  city: City;
  offers: Offer[];
  sortType: string;

  selectedMarker: {
    id: string;
  } | undefined;
  authorizationStatus: AuthorizationStatus;
  isOffersDataLoading: boolean;
  error: string | undefined;
  userEmail: string | undefined;
}

const initialState: StateType = {
  currentOffer: {
    offerInfo: undefined,
    nearestOffers: [],
    reviews: [],
  },
  city: cities[0],
  offers: [],
  sortType: 'Popular',
  selectedMarker: undefined,
  authorizationStatus: AuthorizationStatus.Unknown,
  isOffersDataLoading: false,
  error: undefined,
  userEmail: undefined,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(ChangeCity, (state, {payload}) => {
      state.city = payload;
    })
    .addCase(sortTypeSelector, (state, {payload}) => {
      state.sortType = payload;
    })
    .addCase(highlightMarker, (state, {payload}) => {
      state.selectedMarker = payload;
    })
    .addCase(loadOffers, (state, {payload}) => {
      state.offers = payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(saveEmail, (state, action) => {
      state.userEmail = action.payload;
    })
    .addCase(loadOfferData, (state, { payload }) => {
      state.selectedMarker = { id: payload.offerInfo.id };
      state.currentOffer = { ...payload };
    })
    .addCase(sendReview, (state, { payload }) => {
      state.currentOffer.reviews = [...state.currentOffer.reviews, payload];
    });
});
export {reducer};
