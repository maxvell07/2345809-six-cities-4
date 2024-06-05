import { Link } from 'react-router-dom';
import { Offer } from '../../types/offer.ts';
import { highlightMarker } from '../../store/offers-process/offers-process.ts';
import { useAppDispatch } from '../../hooks/index.ts';
import AddFavorites from '../add-favorites/add-favorites.tsx';
import { cardTypeMap } from '../../const.ts';

type OfferProps = {
  offer: Offer;
  cardType: 'typical' | 'near' | 'favorite';
}

function Cards({ offer, cardType }: OfferProps): JSX.Element {
  const dispatch = useAppDispatch();
  return (
    <article className={`${cardTypeMap.get(cardType)}`}
      onMouseOver={() => dispatch(highlightMarker({ id: offer.id }))}
      onMouseLeave={() => dispatch(highlightMarker(null))}
    >
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={`${cardType === 'favorite' ? 'favorites' : 'cities'}__image-wrapper place-card__image-wrapper`}>
        <a >
          <img className="place-card__image" src={offer.previewImage} width={cardType === 'favorite' ? '150' : '260'} height={cardType === 'favorite' ? '110' : '200'} alt="Place image" />
        </a>
      </div>
      <div className={(cardType === 'favorite') ? 'favorites__card-info place-card__info' : 'place-card__info'}>
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
    </article >
  );
}
export default Cards;
