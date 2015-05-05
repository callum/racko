import Firebase from 'firebase';
import AuthActions from '../actions/AuthActions';
import PresenceService from './PresenceService';

function onAuth(auth) {
  PresenceService.set(auth.uid);
}

const AuthService = {

  authAnonymously() {
    const ref = new Firebase(FIREBASE);

    return new Promise((resolve, reject) => {
      ref.authAnonymously((err, res) => {
        if (err) {
          reject(new Error(err));
          return;
        }

        resolve(res);
        onAuth(res);

        AuthActions.receive(res);
      });
    });
  },

  authWithToken(token) {
    const ref = new Firebase(FIREBASE);

    return new Promise((resolve, reject) => {
      ref.authWithCustomToken(token, (err, res) => {
        if (err) {
          reject(new Error(err));
          return;
        }

        resolve(res);
        onAuth(res);

        AuthActions.receive(res);
      });
    });
  }

};

export default AuthService;
