import {createAction} from '@reduxjs/toolkit';
import { City } from '../types/city';

export const ChangeCity = createAction<City>('сityChange');

export const listFilling = createAction('listFilling');
