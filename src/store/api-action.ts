import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../store/state';
import {AxiosInstance} from 'axios';
import {ExtendedOffer, Offer} from '../types/offer';
import {redirectToRoute} from './action.ts';
import {store} from './index.ts';
import { UserData } from '../types/user-data.ts';
import { AuthData } from '../types/auth-data.ts';
import { Review } from '../types/review.ts';
import {APIRoute, AuthorizationStatus,AppRoute, TIMEOUT_SHOW_ERROR} from '../const.ts';
import {dropToken, saveToken} from '../services/token.ts';
import {CommentFormData} from '../types/comment-form-data.ts';
import { requireAuthorization} from './user-process/user-process.ts';
import {loadFavorites, loadOfferData, loadOffers, sendReview, setOffersDataLoadingStatus, updateOffers} from './offers-process/offers-process.ts';
import {setError} from './other-process/other-process.ts';
import {dropEmail, saveEmail} from '../services/email.ts';
import { CheckButton } from '../types/button.ts';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(


  'offers/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setOffersDataLoadingStatus(true));
    const {data} = await api.get<Offer[]>(APIRoute.Offers);
    dispatch(setOffersDataLoadingStatus(false));
    dispatch(loadOffers(data));
  },
);

export const fetchOfferDataAction = createAsyncThunk<
  void,
  {
    id: string;
  },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
  >('offers/fetchOfferData', async ({id}, {dispatch, extra: api}) => {
    const {data: offerInfo} = await api.get<ExtendedOffer>(
      `${APIRoute.Offers}/${id}`
    );
    const {data: nearestOffers} = await api.get<Offer[]>(
      `${APIRoute.Offers}/${id}/nearby`
    );
    const {data: reviews} = await api.get<Review[]>(
      `${APIRoute.Comments}/${id}`
    );
    dispatch(loadOfferData({offerInfo, nearestOffers, reviews}));
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
  'user/login',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setOffersDataLoadingStatus(true));
    await api.delete(APIRoute.Logout);
    dropToken();
    dropEmail();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    dispatch(setOffersDataLoadingStatus(false));
    dispatch(redirectToRoute(AppRoute.Main));
  },
);

export const clearErrorAction = createAsyncThunk(
  'other/clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
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
