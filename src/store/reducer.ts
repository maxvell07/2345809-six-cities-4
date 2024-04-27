import {createReducer} from '@reduxjs/toolkit';
import { Offer } from '../types/offer';
import { offers } from '../mocks/offers';
import {listFilling, ChangeCity, sortTypeSelector, highlightMarker} from './action';
import { City } from '../types/city';
import { cities } from '../const';
import { Point } from '../types/point';

type StateType = {
  city: City;
  offers: Offer[];
  sortType: string;
  selectedMarker: {
    point: Point;
  } | undefined;
}

const initialState: StateType = {
  city: cities[0],
  offers: offers,
  sortType: 'Popular',
  selectedMarker: undefined,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(ChangeCity, (state, {payload}) => {
      state.city = payload;
    })
    .addCase(listFilling, (state) => {
      state.offers = offers;
    })
    .addCase(sortTypeSelector, (state, {payload}) => {
      state.sortType = payload;
    })
    .addCase(highlightMarker, (state, {payload}) => {
      state.selectedMarker = payload;
    });
});

export {reducer};
