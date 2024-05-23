import { createSelector } from 'reselect';
import {store} from './index.ts';
import { NameSpace } from '../const.ts';

type State = ReturnType<typeof store.getState>;

const selectCurrentOffer = (state: State) => state[NameSpace.Offers].currentOffer;

const selectOfferInfo = createSelector(
  [selectCurrentOffer],
  (currentOffer) => currentOffer.offerInfo
);

const selectNearestOffers = createSelector(
  [selectCurrentOffer],
  (currentOffer) => currentOffer.nearestOffers
);

const selectReviews = createSelector(
  [selectCurrentOffer],
  (currentOffer) => currentOffer.reviews
);

export const selectCurrentOfferData = createSelector(
  [selectOfferInfo, selectNearestOffers, selectReviews],
  (offerInfo, nearestOffers, reviews) => ({
    offerInfo,
    nearestOffers,
    reviews,
  })
);
