import AppDispatcher from '../dispatchers/AppDispatcher';
import { ActionTypes } from '../constants/AuthConstants';
import storeMixin from '../storeMixin';

let token = null;
let uid = null;

const AuthStore = Object.assign({}, storeMixin, {

  getToken() {
    return token;
  },

  getUid() {
    return uid;
  }

});

AuthStore.dispatchToken = AppDispatcher.register(({ action }) => {
  switch (action.type) {
    case ActionTypes.AUTH_RECEIVE_TOKEN:
      token = action.token;

      AuthStore.emitChange();
      break;

    case ActionTypes.AUTH_RECEIVE_UID:
      uid = action.uid;

      AuthStore.emitChange();
      break;
  }
});

export default AuthStore;
