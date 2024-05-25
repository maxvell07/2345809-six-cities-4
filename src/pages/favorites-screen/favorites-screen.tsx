import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import LoginHeader from '../../components/login-header/login-header';
import { getFavorites } from '../../store/offers-process/selectors';
import EmptyFavorites from '../../components/empty-favorites/empty-favorites';
import FavoritesList from '../../components/favorites-list/favorites-list';
function FavoritesScreen(): JSX.Element {
  const favorites = useAppSelector(getFavorites);
  return (
    <div className="page">
      <LoginHeader />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          {favorites.length > 0 ? (
            <FavoritesList favorites={favorites} />
          ) : (
            <EmptyFavorites />
          )}
        </div>
      </main>
      <footer className="footer container">
        <Link to="/" className="footer__logo-link">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </div>
  );
}
export default FavoritesScreen;
