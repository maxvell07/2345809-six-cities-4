import {createAction} from '@reduxjs/toolkit';
import { City } from '../types/city';
import { Point } from '../types/point';

export const ChangeCity = createAction<City>('сityChange');

export const listFilling = createAction('listFilling');

export const sortTypeSelector = createAction<string>('selectSortType');

export const highlightMarker = createAction<{ point: Point } | undefined>('highlightMarker');
