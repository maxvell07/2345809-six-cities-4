import {createReducer} from '@reduxjs/toolkit';
import { Offer } from '../types/offer';
import { City } from '../types/city';
import { cities } from '../const';
import {
  ChangeCity,
  sortTypeSelector,
  highlightMarker,
  loadOffers,
  setError,
  requireAuthorization,
  setOffersDataLoadingStatus
} from './action';
import {AuthorizationStatus} from '../const';

type StateType = {
  city: City;
  offers: Offer[];
  sortType: string;

  selectedMarker: {
    point: string;
  } | undefined;
  authorizationStatus: AuthorizationStatus;
  isOffersDataLoading: boolean;
  error: string | undefined;
}

const initialState: StateType = {
  city: cities[0],
  offers: [],
  sortType: 'Popular',
  selectedMarker: undefined,
  authorizationStatus: AuthorizationStatus.Unknown,
  isOffersDataLoading: false,
  error: undefined,
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

    });
});
export {reducer};
