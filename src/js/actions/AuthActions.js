import AppDispatcher from '../dispatchers/AppDispatcher';
import { ActionTypes } from '../constants/AuthConstants';

const AuthActions = {

  receive(auth) {
    AppDispatcher.handleAction({
      type: ActionTypes.AUTH_RECEIVE,
      auth
    });
  },

  reconcileToken(token) {
    AppDispatcher.handleAction({
      type: ActionTypes.AUTH_RECONCILE_TOKEN,
      token
    });
  }

};

export default AuthActions;
