import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {UserState} from '../state.ts';
import { AuthorizationStatus, NameSpace } from '../../const.ts';

const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userEmail: '',
};

export const userProc = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    requireAuthorization(state, action: PayloadAction<AuthorizationStatus>) {
      state.authorizationStatus = action.payload;
    },
    saveUserEmail(state, action: PayloadAction<string>) {
      state.userEmail = action.payload;
    },
  },
});

export const { requireAuthorization, saveUserEmail } = userProc.actions;
