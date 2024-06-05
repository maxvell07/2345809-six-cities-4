import CommentForm from '../../comment-form/comment-form';
import ReviewsList from '../../components/list-reviews/list-reviews';
import { AuthorizationStatus, NEAREST_COUNT } from '../../const';
import Map from '../../components/map/map';
import CityCardList from '../../offer-list/offer-list';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Points } from '../../types/offer';
import LoginHeader from '../../components/login-header/login-header';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchOfferDataAction } from '../../store/api-action';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { getRaiting } from '../../store/other-process/selectors';
import AddToFavourites from '../../components/add-favorites/add-favorites';
import { selectCurrentOfferData } from '../../store/selectors';
import { getIsSelectedDataLoading } from '../../store/offers-process/selectors';
import NotFoundScreen from '../not-found-screen/not-found-screen';

function OfferScreen(): JSX.Element {
  const { id } = useParams();
  const status = useAppSelector(getAuthorizationStatus);
  const rating = useAppSelector(getRaiting);
  const { offerInfo, nearestOffers, reviews } = useAppSelector(selectCurrentOfferData);
  const isSelectedDataLoading = useAppSelector(getIsSelectedDataLoading);
  const points: Points[] = nearestOffers.map((offer) => ({
    id: offer.id,
    location: offer.location,
  }));

  const mapPoints: Points[] = points.slice(0, NEAREST_COUNT);

  if (offerInfo) {
    mapPoints.push({
      id: offerInfo.id,
      location: offerInfo.location,
    });
  }

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchOfferDataAction({ id: id ?? '' }));
  }, [dispatch, id]);

  if (isSelectedDataLoading) {
    return <div className="container">Loading</div>;
  }
  if (!offerInfo) {
    return (
      <NotFoundScreen />
    );
  }
  return (
    <div className="page">
      <LoginHeader />
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {offerInfo.images.map((url) => (
                <div className="offer__image-wrapper" key={url}>
                  <img className="offer__image" src={url} alt="Photo studio" />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {offerInfo.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="offer__name-wrapper" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'stretch' }}>
                <h1 className="offer__name">{offerInfo.title}</h1>
                <AddToFavourites
                  id={offerInfo.id}
                  isFavorite={offerInfo.isFavorite}
                  iconWidth={31}
                  iconHeight={33}
                  buttonClass="place-card__bookmark-button"
                  activeClass="place-card__bookmark-button--active"
                  iconClass="place-card__bookmark-icon"
                  buttonText="In bookmarks"
                />
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: `${rating ? (rating / 5) * 100 : ''}%` }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{offerInfo.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {offerInfo.type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {`${offerInfo.bedrooms} ${offerInfo.bedrooms && offerInfo.bedrooms > 1 ? 'Bedrooms' : 'Bedroom'}`}
                </li>
                <li className="offer__feature offer__feature--adults">
                  {`Max ${offerInfo.maxAdults} ${offerInfo.maxAdults && offerInfo.maxAdults > 1 ? 'adults' : 'adult'}`}
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{offerInfo.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {offerInfo.goods.map((advantage) => (
                    <li className="offer__inside-item" key={advantage}>
                      {advantage}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className={`offer__avatar-wrapper ${offerInfo.host.isPro ? 'offer__avatar-wrapper--pro' : ''} user__avatar-wrapper`}>
                    <img className="offer__avatar user__avatar" src={offerInfo.host.avatarUrl} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="offer__user-name">
                    {offerInfo.host.name}
                  </span>
                  {offerInfo.host.isPro && (
                    <span className="offer__user-status">Pro</span>
                  )}
                </div>
                <div className="offer__description">
                  <p className="offer__text">{offerInfo.description}</p>
                </div>
              </div>
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
                <ReviewsList reviews={reviews} />
                {status === AuthorizationStatus.Auth && <CommentForm id={id!} />}
              </section>
            </div>
          </div>
          <section className="offer__map map">
            <Map city={nearestOffers[0].city} points={mapPoints} singularCase={offerInfo.id} />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <CityCardList offers={nearestOffers.slice(0, NEAREST_COUNT)} listType={'near'} />
          </section>
        </div>
      </main>
    </div >
  );
}
export default OfferScreen;
