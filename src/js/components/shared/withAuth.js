import React from 'react';

import AuthStore from '../../stores/AuthStore';
import AuthService from '../../services/AuthService';
import AuthUtils from '../../utils/AuthUtils';

import Auth from '../Auth';

import withFlux from './withFlux';

export default function withAuth(Component) {
  class WithAuth extends React.Component {

    static propTypes = {
      token: React.PropTypes.string,
      userId: React.PropTypes.string
    };

    componentDidMount() {
      AuthUtils.reconcileToken();
    }

    componentDidUpdate() {
      this.authenticate();
    }

    async authenticate() {
      const { token, userId } = this.props;

      if (token && !userId) {
        try {
          await AuthService.authWithToken(token);
        } catch(e) {
          console.error(e.message);
        }
      }
    }

    render() {
      const { token, userId } = this.props;

      if (userId) {
        return <Component userId={userId} />;
      }

      if (token) {
        return (
          <p className="status">
            Authenticating…
          </p>
        );
      }

      return <Auth />;
    }

  }

  function getter() {
    return {
      token: AuthStore.getToken(),
      userId: AuthStore.getUserId()
    };
  }

  const WithAuthWithFlux = withFlux(WithAuth, getter, AuthStore);

  return WithAuthWithFlux;
}
