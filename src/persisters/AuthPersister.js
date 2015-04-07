import AppDispatcher from '../dispatchers/AppDispatcher';
import { ActionTypes } from '../constants/AuthConstants';
import { setToken } from '../utils/AuthUtils';

const AuthPersister = {

  initialize() {
    this.dispatchToken = AppDispatcher.register(({ action }) => {
      switch (action.type) {
        case ActionTypes.AUTH_RECEIVE_TOKEN:
          setToken(action.token);
          break;
      }
    });
  }

};

export default AuthPersister;
