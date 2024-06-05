import { AppRoute } from '../../const';
import { store } from '../../store';
import { redirectToRoute } from '../../store/action';
import { cityChange } from '../../store/other-process/other-process';
import {Offer} from '../../types/offer';
import CityCard from '../card/card';

type FavoritesListProps = {
  favorites: Offer[];
}


function FavoritesList({favorites}: FavoritesListProps): JSX.Element {
  const favoritesMap = favorites.reduce(
    (acc: Record<string, Offer[]>, place: Offer) => {
      const city = place.city.name;
      acc[city] = [...(acc[city] ?? []), place];
      return acc;
    },
    {}
  );
  const handleClick = (city: string) => {
    store.dispatch(cityChange(city));
    store.dispatch(redirectToRoute(AppRoute.Main));
  };
  return (
    <section className="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">
        {Object.keys(favoritesMap).map((city) => (
          <li className="favorites__locations-items" key={city}>
            <div className="favorites__locations locations locations--current">
              <div className="locations__item">
                <a className="locations__item-link" onClick = {() => handleClick(city) }>
                  <span>{city}</span>
                </a>
              </div>
            </div>
            <div className="favorites__places">
              {favoritesMap[city].map((place) => (
                <CityCard key={place.id} offer={place} cardType={'favorite'}/>
              ))}
            </div>
          </li>
        ))}

      </ul>
    </section>
  );
}

export default FavoritesList;
