import styles from './Auth.css';

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
      <main className={styles.root}>
        <form
          onSubmit={this.authenticate.bind(this)}
          className={styles.form}>
          <label className={styles.label}>
            Your name
          </label>

          <input
            autoFocus
            type="text"
            name="name"
            className={styles.name}
          />

          <button type="submit" className={styles.submit}>
            Enter
          </button>
        </form>
      </main>
    );
  }

}
