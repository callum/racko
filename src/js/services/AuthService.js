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

        AuthService.monitorPresence(res);
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

        AuthService.monitorPresence(res);
        AuthActions.receive(res);
      });
    });
  },

  monitorPresence(auth) {
    const connected = new Firebase(FIREBASE).child('.info/connected');
    const user = new Firebase(FIREBASE).child('users').child(auth.uid);

    connected.on('value', snapshot => {
      if (snapshot.val() === true) {
        user.child('connections')
          .push(true)
          .onDisconnect()
          .remove();

        user.child('seenAt')
          .onDisconnect()
          .set(Firebase.ServerValue.TIMESTAMP);
      }
    });
  }

};

export default AuthService;
