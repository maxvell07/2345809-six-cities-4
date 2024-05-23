import {combineReducers} from '@reduxjs/toolkit';
import {userProc} from './user-process/user-process';
import {otherProc} from './other-process/other-process.ts';
import {offersProc} from './offers-process/offers-process.ts';
import { NameSpace } from '../const.ts';

export const rootReducer = combineReducers({
  [NameSpace.Offers]: offersProc.reducer,
  [NameSpace.Other]: otherProc.reducer,
  [NameSpace.User]: userProc.reducer,
});
