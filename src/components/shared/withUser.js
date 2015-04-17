import React from 'react';

import UserSynchronizer from '../../synchronizers/UserSynchronizer';
import UserStore from '../../stores/UserStore';

import withSync from './withSync';
import withFlux from './withFlux';

export default function withUser(Component) {
  class WithUser extends React.Component {

    render() {
      const { user } = this.props;

      return (
        <div>
          <p>Logged in as {user.get('name')}</p>

          <Component user={user} />
        </div>
      );
    }

  }

  WithUser.propTypes = {
    uid: React.PropTypes.string.isRequired
  };

  function syncer() {
    return [
      UserSynchronizer.get(this.props.uid)
    ];
  }

  function getter() {
    return {
      user: UserStore.get(this.props.uid)
    };
  }

  const WithUserWithSync = withSync(WithUser, syncer);
  const WithUserWithFlux = withFlux(WithUserWithSync, getter, UserStore);

  return WithUserWithFlux;
}
