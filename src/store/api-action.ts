import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../store/state';
import {AxiosInstance} from 'axios';
import {ExtendedOffer, Offer} from '../types/offer';
import {redirectToRoute} from './action.ts';
import { UserData } from '../types/user-data.ts';
import { AuthData } from '../types/auth-data.ts';
import { Review } from '../types/review.ts';
import {APIRoute, AuthorizationStatus,AppRoute, TIMEOUT_SHOW_ERROR} from '../const.ts';
import {dropToken, saveToken} from '../services/token.ts';
import {CommentFormData} from '../types/comment-form-data.ts';
import { requireAuthorization} from './user-process/user-process.ts';
import {loadFavorites, sendReview, updateOffers} from './offers-process/offers-process.ts';
import {setError} from './other-process/other-process.ts';
import {dropEmail, saveEmail} from '../services/email.ts';
import { CheckButton } from '../types/button.ts';
import { OfferData } from '../types/offer-data.ts';

export const fetchOffersAction = createAsyncThunk<Offer[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(


  'offers/fetchOffers',
  async (_arg, { extra: api}) => {
    const {data} = await api.get<Offer[]>(APIRoute.Offers);
    return data;
  },
);

export const fetchOfferDataAction = createAsyncThunk<
  OfferData,
  {
    id: string;
  },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
  >('offers/fetchOfferData', async ({id}, { extra: api}) => {
    const {data: offerInfo} = await api.get<ExtendedOffer>(
      `${APIRoute.Offers}/${id}`
    );
    const {data: nearestOffers} = await api.get<Offer[]>(
      `${APIRoute.Offers}/${id}/nearby`
    );
    const {data: reviews} = await api.get<Review[]>(
      `${APIRoute.Comments}/${id}`
    );
    return {offerInfo, nearestOffers, reviews};
  });


export const sendCommentAction = createAsyncThunk<
  void,
  {
    comment: CommentFormData;
    id: string;
  },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('offers/sendComment', async ({comment, id}, {dispatch, extra: api}) => {
  const {data: review} = await api.post<Review>(
    `${APIRoute.Comments}/${id}`,
    {
      comment: comment.comment,
      rating: comment.rating,
    }
  );
  dispatch(sendReview(review));
});

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dropEmail();
    dispatch(fetchOffersAction());
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    dispatch(redirectToRoute(AppRoute.Main));
  },
);

export const clearErrorAction = createAsyncThunk(
  'offer/clearError',
  (_, { dispatch }) => {
    setTimeout(() => {
      dispatch(setError(null));
    },
    TIMEOUT_SHOW_ERROR,
    );
  },
);

export const fetchFavoritesAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offers/fetchFavorites',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Offer[]>(`${APIRoute.Favorite}`);
    dispatch(loadFavorites(data));
  }
);

export const changeFavouriteStatusAction = createAsyncThunk<void, CheckButton, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offers/changeFavoriteStatus',
  async ({status, offerId}, {extra: api, dispatch}) => {
    const {data} = await api.post<Offer>(`${APIRoute.Favorite}/${offerId}/${status}`);
    dispatch(updateOffers(data));
    dispatch(fetchFavoritesAction());
  },
);


export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({email: email, password}, {dispatch, extra: api}) => {
    const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(token);
    saveEmail(email);
    dispatch(fetchOffersAction());
    dispatch(fetchFavoritesAction());
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Main));
  },
);
