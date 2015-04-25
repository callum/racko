import React from 'react';

import UserSynchronizer from '../../synchronizers/UserSynchronizer';
import UserStore from '../../stores/UserStore';

import withSync from './withSync';
import withFlux from './withFlux';

export default function withUser(Component) {
  class WithUser extends React.Component {

    static contextTypes = {
      router: React.PropTypes.func.isRequired
    };

    static propTypes = {
      userId: React.PropTypes.string.isRequired,
      user: React.PropTypes.object.isRequired
    };

    render() {
      const { user } = this.props;

      if (user.size) {
        return (
          <div>
            <p>Logged in as {user.get('name')}</p>

            <Component user={user} />
          </div>
        );
      }

      return (
        <p>Retrieving user…</p>
      );
    }

  }

  function syncer() {
    return [
      UserSynchronizer.get(this.props.userId)
    ];
  }

  function getter() {
    return {
      user: UserStore.get(this.props.userId)
    };
  }

  const WithUserWithSync = withSync(WithUser, syncer);
  const WithUserWithFlux = withFlux(WithUserWithSync, getter, UserStore);

  return WithUserWithFlux;
}