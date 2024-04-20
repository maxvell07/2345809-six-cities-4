import {createReducer} from '@reduxjs/toolkit';
import { Offer } from '../types/offer';
import { offers } from '../mocks/offers';
import {listFilling, ChangeCity} from './action';
import { City } from '../types/city';
import { cities } from '../const';

type StateType = {
  city: City;
  offers: Offer[];
}

const initialState: StateType = {
  city: cities[0],
  offers: offers
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(ChangeCity, (state, {payload}) => {
      state.city = payload;
    })
    .addCase(listFilling, (state) => {
      state.offers = offers;
    });
});

export {reducer};
