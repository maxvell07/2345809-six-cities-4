import {createAction} from '@reduxjs/toolkit';
import { Offer } from '../types/offer';
import { AuthorizationStatus } from '../const';
import { City } from '../types/city';

export const ChangeCity = createAction<City>('сityChange');

export const highlightMarker = createAction<{ point: string } | undefined>('highlightMarker');

export const sortTypeSelector = createAction<string>('sortTypeSelector');

export const loadOffers = createAction<Offer[]>('loadOffers');

export const setOffersDataLoadingStatus = createAction<boolean>('setOffersDataLoadingStatus');

export const setError = createAction<string | undefined>('setError');

export const requireAuthorization = createAction<AuthorizationStatus>('requireAuthorization');
