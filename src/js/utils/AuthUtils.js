import AuthActions from '../actions/AuthActions';

const TOKEN = 'token';

const AuthUtils = {

  setToken(token) {
    localStorage.setItem(TOKEN, token);
  },

  reconcileToken() {
    const token = localStorage.getItem(TOKEN);

    if (token) {
      AuthActions.reconcileToken(token);
    }
  }

};

export default AuthUtils;
