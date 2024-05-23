import { useAppDispatch, useAppSelector } from '../../hooks';
import { cityChange } from '../../store/other-process/other-process';
import { getCity } from '../../store/other-process/selectors';
import { City } from '../../types/city';
import { memo } from 'react';


type CitiesListProps = {
  cities: City[];
};

type CityProps = {
  city: string;
  cityChangeName: (city: string) => void;
};

function CityElement({ city, cityChangeName }: CityProps): JSX.Element {
  const selectedCity = useAppSelector(getCity);
  return (
    <li className="locations__item" onClick={() => cityChangeName(city)}>
      <a className={`locations__item-link tabs__item ${(city === selectedCity) ? 'tabs__item--active' : ''}`}>
        <span>{city}</span>
      </a>
    </li>
  );
}


function CitiesList({ cities }: CitiesListProps): JSX.Element {
  const dispatch = useAppDispatch();
  const changeCurCity = (city: string) =>{
    dispatch(cityChange(city));
  };
  return (
    <ul className="locations__list tabs__list">
      {cities.map((city) => (
        <CityElement
          key={city.name}
          city={city.name}
          cityChangeName={changeCurCity}
        />
      ))}
    </ul>
  );
}
const CitiesListMemo = memo(CitiesList);
export default CitiesListMemo;
