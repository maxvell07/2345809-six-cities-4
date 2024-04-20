import MainScreen from '../../pages/main-screen/main-screen.tsx';
import LoginScreen from '../../pages/login-screen/login-screen';
import FavotitesScreen from '../../pages/favorites-screen/favorites-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen.tsx';
import PrivateRoute from '../private-route/private-route';
import { AuthorizationStatus } from '../constants/status.tsx';
import { AppRoute } from '../constants/app-route.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Review } from '../../types/review';
import {useAppDispatch} from '../../hooks/index.ts';
import {listFilling} from '../../store/action.ts';

type AppComponentProps = {
  reviews: Review[];
}
function App({ reviews }: AppComponentProps): JSX.Element {
  const dispatch = useAppDispatch();
  dispatch(listFilling());
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainScreen/>}
        />
        <Route
          path={AppRoute.Login}
          element={<LoginScreen/>}
        />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute
              authorizationStatus={AuthorizationStatus.Auth}
            >
              <FavotitesScreen/>
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Offer}
          element={<OfferScreen reviews={reviews}/>}
        />
        <Route
          path="*"
          element={<NotFoundScreen/>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
