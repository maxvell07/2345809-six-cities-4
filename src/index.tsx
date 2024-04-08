import React from 'react';
import ReactDOM from 'react-dom/client';
import Settings from './const';
import App from './components/app/app';
import {offers} from './mocks/offers';
import { reviews } from './mocks/reviews';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App placesCount={Settings.placesCount}
      offers={offers}
      reviews={reviews}
    />
  </React.StrictMode>
);
