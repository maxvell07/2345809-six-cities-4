import OfferList from '../../offer-list/offer-list';
import Map from '../../components/map/map';
import { Offer } from '../../types/offer';
import { useAppSelector } from '../../hooks';
import CityList from '../../components/city-list/city-list';
import { cities } from '../../const';
import SortingCardOffers from '../../components/sorting-card/sorting-card';
import LoginHeader from '../../components/login-header/login-header';
import { useEffect, useState } from 'react';
import { getHasError, getOffers } from '../../store/offers-process/selectors';
import { getCity } from '../../store/other-process/selectors';
import EmptyOffers from '../../components/empty-offers/empty-offers';

function MainScreen(): JSX.Element {
  const offers = useAppSelector(getOffers);
  const [curCityOffers, setCurCityOffers] = useState<Offer[]>(offers);
  const city = useAppSelector(getCity);
  const hasError = useAppSelector(getHasError);

  useEffect(() => {
    const filteredOffers = offers.filter((offer) => offer.city.name === city);
    setCurCityOffers(filteredOffers);
  }, [city, offers]);
  return (
    <div className="page page--gray page--main">
      <LoginHeader />
      <main className={`page__main page__main--index ${hasError ? 'page__main--index-empty' : ''}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CityList cities={cities} />
          </section>
        </div>
        {hasError ? (
          <EmptyOffers city={city} />
        ) : (
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{`${curCityOffers.length} places to stay in ${city}`}</b>
                <SortingCardOffers />
                <OfferList offers={curCityOffers} listType='typical' />
              </section>
              <div className="cities__right-section">
                <section className="cities__map map">
                  <Map city={curCityOffers.length > 0 ? curCityOffers[0].city : offers[0].city} points={curCityOffers} singularCase={undefined} />
                </section>
              </div>
            </div>
          </div>
        )};
      </main>
    </div>
  );
}

export default MainScreen;
