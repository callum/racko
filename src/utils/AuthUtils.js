import Firebase from 'firebase';

const TOKEN = 'token';

function getToken() {
  localStorage.getItem(TOKEN);
}

function setToken(token) {
  localStorage.setItem(TOKEN, token);
}

function authenticate(user) {
  const ref = new Firebase(FIREBASE);

  ref.authAnonymously((err, res) => {
    if (err) {
      console.log('Authentication failed', err);
      return;
    }

    AuthActions.receiveToken(res.token);
    AuthActions.receiveUid(res.uid);
  });
}

function authenticate() {
  const ref = new Firebase(FIREBASE);

  ref.authWithCustomToken(token, (err, res) => {
    if (err) {
      console.log('Authentication failed', err);
      return;
    }

    AuthActions.receiveUid(res.uid);
  });
}
