import AppDispatcher from '../dispatchers/AppDispatcher';
import { ActionTypes } from '../constants/AuthConstants';

const AuthActions = {

  receiveToken(token) {
    AppDispatcher.handleAction({
      type: ActionTypes.AUTH_RECEIVE_TOKEN,
      token
    });
  },

  receiveUid(uid) {
    AppDispatcher.handleAction({
      type: ActionTypes.AUTH_RECEIVE_UID,
      uid
    });
  }

};

export default AuthActions;
