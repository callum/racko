import React from 'react';
import { RouteHandler } from 'react-router';

import AuthStore from '../stores/AuthStore';
import UserStore from '../stores/UserStore';

import AuthUtils from '../utils/AuthUtils';
import withFlux from './shared/withFlux';

export class App extends React.Component {

  componentDidUpdate() {
    const token = this.props.token;
    const user = this.props.user;

    const requiresAuth = token && !user;

    if (requiresAuth) {
      AuthUtils.authenticate(token);
    }
  },

  authenticate(e) {
    AuthUtils.authenticate({
      name: e.target.elements.name.value
    });

    e.preventDefault();
  }

  render() {
    const params = this.context.router.getCurrentParams();
    const token = this.props.token;
    const user = this.props.user;

    if (user) {
      return (
        <div>
          <h1>Rack-O</h1>

          <p>Logged in as {user.name}</p>

          <RouteHandler params={params} />
        </div>
      );
    }

    if (token) {
      return (
        <p>Logging in…</p>
      );
    }

    return (
      <form onSubmit={this.authenticate.bind(this)}>
        <h1>Login</h1>

        <label>
          Your name
          <input type="text" name="name" />
        </label>

        <button type="submit">
          Authenticate
        </button>
      </form>
    );
  }

}

App.contextTypes = {
  router: React.PropTypes.func.isRequired
};

App.propTypes = {
  token: React.PropTypes.string,
  user: React.PropTypes.object
};

App.defaultProps = {
  user: Immutable.Map()
};

function getter() {
  return {
    token: AuthStore.getToken(),
    user: UserStore.getCurrent()
  };
}

const AppWithFlux = withFlux(App, getter, AuthStore, UserStore);
