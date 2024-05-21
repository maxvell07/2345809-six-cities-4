import OfferList from '../../offer-list/offer-list';
import Map from '../../components/map/map';
import { Offer } from '../../types/offer';
import { useAppSelector } from '../../hooks';
import CityList from '../../components/city-list/city-list';
import { cities } from '../../const';
import SortingCardOffers from '../../components/sorting-card/sorting-card';
import LoginHeader from '../../components/login-header/login-header';
import { useEffect, useState } from 'react';

function MainScreen(): JSX.Element {
  const offers = useAppSelector((state) => state.offers);
  const [curCityOffers, setCurCityOffers] = useState<Offer[]>(offers);
  const city = useAppSelector((state) => state.city);
  useEffect(() => {
    const filteredOffers = offers.filter((offer) => offer.city.name === city.name);
    setCurCityOffers(filteredOffers);
  }, [city, offers]);
  return (
    <div className="page page--gray page--main">
      <LoginHeader />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CityList cities={cities}/>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{`${curCityOffers.length} places to stay in ${city.name}`}</b>
              <SortingCardOffers/>
              <OfferList offers={curCityOffers} listType='typical'/>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map city={curCityOffers.length > 0 ? curCityOffers[0].city : offers[0].city} points={curCityOffers} singularCase={undefined}/>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
