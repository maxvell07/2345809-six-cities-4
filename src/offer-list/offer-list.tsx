import CityCard from '../components/city-card/city-card';
import { Offer } from '../types/offer';

type CityCardPropsList = {
  offers: Offer[];
  listType:'typical' | 'near';
};

function CityCardList({offers, listType}: CityCardPropsList): JSX.Element {
  return (
    <div className={`${listType === 'typical' ? 'cities__places-list places__list tabs__content' : 'near-places__list places__list'}`}>
      {offers.map((offer) => (
        <CityCard key={offer.id} offer={offer} cardType={listType}/>
      ))}
    </div>
  );
}

export default CityCardList;
