import { COMMENT_COUNT } from '../../const.ts';
import { Review } from '../../types/review.ts';
import OneReview from '../review/review.tsx';

type ReviewListProps = {
  reviews: Review[];
};

function ReviewsList({reviews}: ReviewListProps): JSX.Element {
  return (
    <ul className="reviews__list">
      {reviews
        .slice()
        .sort((reviewA, reviewB) => {

          const dateA = new Date(reviewA.date).getTime();
          const dateB = new Date(reviewB.date).getTime();

          return dateB - dateA;
        })
        .slice(0, COMMENT_COUNT)
        .map((review) => (

          <OneReview key={review.id} review={review} />
        ))}
    </ul>
  );
}

export default ReviewsList;
