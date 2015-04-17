import Firebase from 'firebase';
import AuthActions from '../actions/AuthActions';

const TOKEN = 'token';
const FIREBASE = 'https://dazzling-heat-6913.firebaseio.com/';

const AuthUtils = {

  setToken(token) {
    localStorage.setItem(TOKEN, token);
  },

  reconcileToken() {
    const token = localStorage.getItem(TOKEN);

    if (token) {
      AuthActions.reconcileToken(token);
    }
  },

  authAnonymously(callback) {
    const ref = new Firebase(FIREBASE);

    ref.authAnonymously((err, res) => {
      if (err) {
        console.log('Authentication failed', err);
        return;
      }

      callback(res);

      AuthActions.receive(res);
    });
  },

  authWithToken(token) {
    const ref = new Firebase(FIREBASE);

    ref.authWithCustomToken(token, (err, res) => {
      if (err) {
        console.log('Authentication failed', err);
        return;
      }

      AuthActions.receive(res);
    });
  }

};

export default AuthUtils;
