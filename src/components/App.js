import React from 'react';
import { RouteHandler } from 'react-router';

import AuthStore from '../stores/AuthStore';
import UserActions from '../actions/UserActions';

import AuthUtils from '../utils/AuthUtils';
import withFlux from './shared/withFlux';
import withUser from './shared/withUser';

export class App extends React.Component {

  componentDidMount() {
    AuthUtils.reconcileToken();
  }

  componentDidUpdate() {
    const { token, uid } = this.props;

    if (token && !uid) {
      AuthUtils.authWithToken(token);
    }
  }

  createUser(e) {
    const name = e.target.elements.name.value;

    AuthUtils.authAnonymously(auth => {
      UserActions.create(auth.uid, { name });
    });

    e.preventDefault();
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
