import Firebase from 'firebase';
import AuthActions from '../actions/AuthActions';

const AuthService = {

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

export default AuthService;
