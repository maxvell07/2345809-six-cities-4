import { NameSpace } from '../../const';
import {State} from '../state';

export const getAuthorizationStatus = (state: State) => state[NameSpace.User].authorizationStatus;

