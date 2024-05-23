import { Link } from 'react-router-dom';
import Card from '../../components/city-card/city-card';
import { useAppSelector } from '../../hooks';
import LoginHeader from '../../components/login-header/login-header';
import { getOffers } from '../../store/offers-process/selectors';
function FavoritesScreen(): JSX.Element {
  const offers = useAppSelector(getOffers);
  const favoriteoffers = offers.filter((offer) => offer.isFavorite);
  return (
    <div className="page">
      <LoginHeader />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              <li className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a className="locations__item-link" href="#">
                      <span>Amsterdam</span>
                    </a>
                  </div>
                </div>
                <div className="favorites__places">
                  {favoriteoffers.map((offer) =>
                    <Card key={offer.id} offer={offer} cardType='typical' />
                  )}
                </div>
              </li>
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link to="/" className="footer__logo-link">
          <a className="footer__logo-link" href="main.html">
            <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
          </a>
        </Link>
      </footer>
    </div>
  );
}
export default FavoritesScreen;
