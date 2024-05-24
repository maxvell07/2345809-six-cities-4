import {Link} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks/index.ts';
import {AuthorizationStatus} from '../../const.ts';
import { logoutAction } from '../../store/api-action.ts';
import {getAuthorizationStatus} from '../../store/user-process/selectors.ts';
import { getEmail } from '../../services/email.ts';
import { getFavorites } from '../../store/offers-process/selectors.ts';


function LoginHeader(): JSX.Element {
  const dispatch = useAppDispatch();
  const status = useAppSelector(getAuthorizationStatus);
  const userEmail = useAppSelector(getEmail);
  const handleSignOut = () => {
    dispatch(logoutAction());
  };
  const favorites = useAppSelector(getFavorites);

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link to="/" className="header__logo-link header__logo-link--active">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <div className="header__nav-link header__nav-link--profile">
                  <div className="header__avatar-wrapper user__avatar-wrapper">
                  </div>
                  {status === AuthorizationStatus.Auth ? (
                    <Link to="/favorites">
                      <span className="header__user-name user__name">{userEmail}</span>
                      <span className="header__favorite-count">{favorites.length}</span>
                    </Link>
                  ) : (
                    <Link to="/login" className="header__nav-link">Login</Link>
                  )}
                </div>
              </li>
              {status === AuthorizationStatus.Auth && (
                <li className="header__nav-item">
                  <Link to="/login" className="header__nav-link" onClick={handleSignOut}>
                    <span className="header__signout">Sign out</span>
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default LoginHeader;
