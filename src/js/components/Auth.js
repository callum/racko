import React from 'react';
import UserActions from '../actions/UserActions';
import AuthService from '../services/AuthService';

export default class Auth extends React.Component {

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
      <main className="auth">
        <form
          onSubmit={this.authenticate.bind(this)}
          className="auth__form">
          <label className="auth__label">
            Your name
          </label>

          <input
            autoFocus
            type="text"
            name="name"
            className="auth__name"
          />

          <button type="submit" className="auth__submit">
            Enter
          </button>
        </form>
      </main>
    );
  }

}
