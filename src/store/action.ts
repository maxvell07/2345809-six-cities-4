import {createAction} from '@reduxjs/toolkit';
import { AppRoute } from '../components/constants/app-route';

export const redirectToRoute = createAction<AppRoute>('redirectToRoute');

