import React from 'react';
import AuthService from '../services/AuthService';
import UserActions from '../actions/UserActions';

class Auth extends React.Component {

  async authenticate(e) {
    e.preventDefault();

    const name = e.target.elements.name.value;

    let auth;

    try {
      auth = await AuthService.authAnonymously();
    } catch (e) {
      console.error(e.message);
    }

    UserActions.create(auth.uid, { name });
  }

  render() {
    return (
      <main>
        <form onSubmit={this.authenticate.bind(this)}>
          <label>
            Your name
            <input type="text" name="name" />
          </label>

          <button type="submit">
            Create user
          </button>
        </form>
      </main>
    );
  }

}

export default Auth;
