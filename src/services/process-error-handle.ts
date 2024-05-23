import {store} from '../store';
import { setError } from '../store/other-process/other-process';
import {clearErrorAction} from '../store/api-action';

export const processErrorHandle = (message: string): void => {
  store.dispatch(setError(message));
  store.dispatch(clearErrorAction());
};
