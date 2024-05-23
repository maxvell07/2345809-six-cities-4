import MainScreen from '../../pages/main-screen/main-screen.tsx';
import LoginScreen from '../../pages/login-screen/login-screen';
import FavotitesScreen from '../../pages/favorites-screen/favorites-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen.tsx';
import PrivateRoute from '../private-route/private-route';
import { AppRoute } from '../constants/app-route.tsx';
import { Route, Routes } from 'react-router-dom';
import { useAppSelector } from '../../hooks/index.ts';
import LoadScreen from '../../pages/load-screen/load-screen.tsx';
import browserHistory from '../../browser-history.ts';
import HistoryRouter from '../history-router/history-router.tsx';
import { getIsOffersDataLoading } from '../../store/offers-process/selectors.ts';
import { getAuthorizationStatus } from '../../store/user-process/selectors.ts';
import { AuthorizationStatus } from '../../const.ts';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isOffersDataLoading = useAppSelector(getIsOffersDataLoading);

  if (authorizationStatus === AuthorizationStatus.Unknown || isOffersDataLoading) {
    return (
      <LoadScreen />
    );
  }
  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainScreen />}
        />
        <Route
          path={AppRoute.Login}
          element={<LoginScreen />}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute
              authorizationStatus={authorizationStatus}
            >
              <FavotitesScreen />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Offer}
          element={<OfferScreen />}
        />
        <Route
          path="*"
          element={<NotFoundScreen />}
        />
      </Routes>
    </HistoryRouter>
  );
}

export default App;
