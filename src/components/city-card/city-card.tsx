import { Link } from 'react-router-dom';
import { Offer } from '../../types/offer';
import { highlightMarker } from '../../store/offers-process/offers-process.ts';
import { useAppDispatch } from '../../hooks';
import AddFavorites from '../add-favorites/add-favorites.tsx';

type OfferProps = {
  offer: Offer;
  cardType: 'typical' | 'near';
}

function CityCard({ offer, cardType }: OfferProps): JSX.Element {
  const dispatch = useAppDispatch();
  return (
    <article className={`${cardType === 'typical' ? 'cities__card place-card' : 'near-places__card place-card'}`}
      onMouseOver={() => dispatch(highlightMarker({ id: offer.id }))}
      onMouseLeave={() => dispatch(highlightMarker(null))}
    >
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img className="place-card__image" src={offer.previewImage} width="260" height="200" alt="Place image" />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <AddFavorites
            id={offer.id}
            isFavorite={offer.isFavorite}
            iconWidth={18}
            iconHeight={19}
            buttonClass="place-card__bookmark-button"
            activeClass="place-card__bookmark-button--active"
            iconClass="place-card__bookmark-icon"
            buttonText="In bookmarks"
          />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${(offer.rating / 5) * 100}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}
export default CityCard;
