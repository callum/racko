import React from 'react';
import { RouteHandler } from 'react-router';

import AuthStore from '../stores/AuthStore';
import UserActions from '../actions/UserActions';

import AuthService from '../services/AuthService';
import AuthUtils from '../utils/AuthUtils';

import withFlux from './shared/withFlux';
import withUser from './shared/withUser';

export class App extends React.Component {

  static propTypes = {
    token: React.PropTypes.string,
    uid: React.PropTypes.string
  }

  componentDidMount() {
    AuthUtils.reconcileToken();
  }

  componentDidUpdate() {
    this.authenticate();
  }

  async authenticate() {
    const { token, uid } = this.props;

    if (token && !uid) {
      try {
        await AuthService.authWithToken(token);
      } catch(e) {
        console.error(e.message);
      }
    }
  }

  async createUser(e) {
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
    const { token, uid } = this.props;

    if (uid) {
      const RouteHandlerWithUser = withUser(RouteHandler);

      return <RouteHandlerWithUser uid={uid} />;
    }

    if (token) {
      return (
        <p>Authenticating…</p>
      );
    }

    return (
      <form onSubmit={this.createUser.bind(this)}>
        <h1>Login</h1>

        <label>
          Your name
          <input type="text" name="name" />
        </label>

        <button type="submit">
          Create user
        </button>
      </form>
    );
  }

}

function getter() {
  return {
    token: AuthStore.getToken(),
    uid: AuthStore.getUid()
  };
}

const AppWithFlux = withFlux(App, getter, AuthStore);

export default AppWithFlux;
