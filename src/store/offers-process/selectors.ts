import {State} from '../state.ts';
import {NameSpace} from '../../const.ts';

export const getOffers = (state: State) => state[NameSpace.Offers].offers;
export const getIsOffersDataLoading = (state: State) => state[NameSpace.Offers].isOffersDataLoading;
export const getSelectedMarker = (state: State) => state[NameSpace.Offers].selectedMarker;
export const getFavorites = (state: State) => state[NameSpace.Offers].favorites;
