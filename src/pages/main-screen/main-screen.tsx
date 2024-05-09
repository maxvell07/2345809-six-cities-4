import OfferList from '../../offer-list/offer-list';
import Map from '../../components/map/map';
import { useAppSelector } from '../../hooks';
import CityList from '../../components/city-list/city-list';
import { cities } from '../../const';
import SortingCardOffers from '../../components/sorting-card/sorting-card';
import LoginHat from '../../components/login-hat/login-hat';

function MainScreen(): JSX.Element {
  const city = useAppSelector((state) => state.city);
  const offers = useAppSelector((state) => state.offers);
  const cityOffers = offers.filter((offer) => offer.city.name === city.name);
  return (
    <div className="page page--gray page--main">
      <LoginHat />
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
              <b className="places__found">{cityOffers.length} places to stay in {city.name}</b>
              <SortingCardOffers/>
              <OfferList offers={cityOffers} listType='typical'/>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map offers={cityOffers} city={city}/>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
