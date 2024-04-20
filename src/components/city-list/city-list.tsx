import { useAppDispatch } from '../../hooks';
import {ChangeCity} from '../../store/action';
import { City } from '../../types/city';


type CitiesListProps = {
  cities: City[];
};

type CityProps = {
  city: City;
  cityChangeName: (city: City) => void;
};
const CityElement = ({city, cityChangeName}: CityProps): JSX.Element => (
  <li className="locations__item" onClick={() => cityChangeName(city)}>
    <a className="locations__item-link tabs__item" href="#">
      <span>{city.name}</span>
    </a>
  </li>
);

function CitiesList({cities}: CitiesListProps): JSX.Element {
  const dispatch = useAppDispatch();
  return (
    <ul className="locations__list tabs__list">
      {cities.map((city) => (
        <CityElement
          key={city.name}
          city={city}
          cityChangeName= {() =>dispatch(ChangeCity(city))}
        />
      ))}
    </ul>
  );
}

export default CitiesList;
