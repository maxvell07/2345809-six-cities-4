import CityCard from '../components/card/card.tsx';
import {useAppSelector} from '../hooks';
import { Offer } from '../types/offer';
import {sorting} from '../const.ts';
import { getSortType } from '../store/other-process/selectors.ts';
type CityCardPropsList = {
  offers: Offer[];
  listType:'typical' | 'near';
};

function CityCardList({offers, listType}: CityCardPropsList): JSX.Element {
  const selectedSortType = useAppSelector(getSortType);
  return (
    <div className={`${listType === 'typical' ? 'cities__places-list places__list tabs__content' : 'near-places__list places__list'}`}>
      {sorting(offers,selectedSortType).map((offer) => (
        <CityCard key={offer.id} offer={offer} cardType={listType}/>
      ))}
    </div>
  );
}

export default CityCardList;
