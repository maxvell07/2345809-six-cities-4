import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace } from '../../const.ts';
import {OtherState} from '../state.ts';

const initialState: OtherState = {
  city: 'Paris',
  sortType: 'Popular',
  error: null,
};

export const otherProc = createSlice({
  name: NameSpace.Other,
  initialState,
  reducers: {
    cityChange(state, action: PayloadAction<string>) {
      state.city = action.payload;
    },
    sortTypeSelector(state, action: PayloadAction<string>) {
      state.sortType = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { cityChange, sortTypeSelector, setError } = otherProc.actions;
