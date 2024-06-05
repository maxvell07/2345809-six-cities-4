import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Offer} from '../../types/offer';
import {OffersState} from '../state.ts';
import {NameSpace, updateOffer} from '../../const.ts';
import { Review } from '../../types/review.ts';
import { fetchOfferDataAction, fetchOffersAction } from '../api-action.ts';


const initialState: OffersState = {
  currentOffer: {
    offerInfo: null,
    nearestOffers: [],
    reviews: [],
  },
  offers: [],
  selectedMarker: null,
  isOffersDataLoading: false,
  isSelectedDataLoading: false,
  favorites: [],
  hasError: false
};

export const offersProc = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {
    updateOffers: (state, action: PayloadAction<Offer>) => {
      updateOffer(state.offers, action.payload);
    },
    loadFavorites(state, action: PayloadAction<Offer[]>) {
      state.favorites = action.payload;
    },
    sendReview(state, action: PayloadAction<Review>) {
      state.currentOffer.reviews = [...state.currentOffer.reviews, action.payload];
    },
    highlightMarker(state, action: PayloadAction<{ id: string } | null>) {
      state.selectedMarker = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersDataLoading = true;
        state.hasError = false;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersDataLoading = false;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isOffersDataLoading = false;
        state.hasError = true;
      })
      .addCase(fetchOfferDataAction.pending, (state) => {
        state.isSelectedDataLoading = true;
        state.hasError = false;
      })
      .addCase(fetchOfferDataAction.fulfilled, (state, action) => {
        state.isSelectedDataLoading = false;
        state.selectedMarker = {id: action.payload.offerInfo.id};
        state.currentOffer = action.payload;
      })
      .addCase(fetchOfferDataAction.rejected, (state) => {
        state.isSelectedDataLoading = false;
        state.hasError = true;
      });
  }
});
export const { sendReview, highlightMarker, updateOffers, loadFavorites} = offersProc.actions;
