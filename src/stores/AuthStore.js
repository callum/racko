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
    case ActionTypes.AUTH_RECEIVE:
      token = action.auth.token;
      uid = action.auth.uid;

      AuthStore.emitChange();
      break;

    case ActionTypes.AUTH_RECONCILE_TOKEN:
      token = action.token;

      AuthStore.emitChange();
      break;
  }
});

export default AuthStore;