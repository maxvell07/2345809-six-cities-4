import {useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/index.ts';
import {sortWidth, sortHeight, SORT_TYPE} from '../../const.ts';
import {getSortType} from '../../store/other-process/selectors.ts';
import { sortTypeSelector } from '../../store/other-process/other-process.ts';

function SortingCardOffers() {
  const [isOpen, setIsOpen] = useState(false);
  const selectedsortType = useAppSelector(getSortType);
  const dispatch = useAppDispatch();
  const handleSortTypeChange = (sortType: string) => {
    dispatch(sortTypeSelector(sortType));
  };
  return (
    <form className="places__sorting" action="#" method="get" onClick={() => setIsOpen(!isOpen)}>
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex={0}>
        {selectedsortType}
        <svg className="places__sorting-arrow" width={sortWidth} height={sortHeight}>
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpen ? 'places__options--opened' : ''}`}>
        {Object.entries(SORT_TYPE).map(([key, sortType]) => (
          <li key={key}
            className={`places__option ${selectedsortType === sortType ? 'places__option--active' : ''}`}
            onClick={() => handleSortTypeChange(sortType)}
            tabIndex={0}
          >
            {sortType}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default SortingCardOffers;
