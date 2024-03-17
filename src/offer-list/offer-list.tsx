import CityCard from '../components/city-card/city-card';
import { Offer } from '../types/offer';

type CityCardPropsList = {
  offers: Offer[];
};

function CityCardList({offers}: CityCardPropsList): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <CityCard key={offer.id} offer={offer}/>
      ))}
    </div>
  );
}

export default CityCardList;
