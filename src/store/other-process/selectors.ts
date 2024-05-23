import { NameSpace } from '../../const';
import {State} from '../state';

export const getCity = (state: State) => state[NameSpace.Other].city;
export const getSortType = (state: State) => state[NameSpace.Other].sortType;
export const getError = (state: State) => state[NameSpace.Other].error;
export const getRaiting = (state: State) => state[NameSpace.Offers].currentOffer.offerInfo?.rating;
