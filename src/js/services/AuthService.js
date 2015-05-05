import Firebase from 'firebase';
import AuthActions from '../actions/AuthActions';

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

        AuthActions.receive(res);
      });
    });
  }

};

export default AuthService;
