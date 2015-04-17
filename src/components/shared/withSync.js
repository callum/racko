import React from 'react';

export default function withFirebase(Component, syncer) {
  class WithSync extends React.Component {

    componentWillMount() {
      this.listeners = syncer.call(this);
    }

    componentWillUnmount() {
      this.listeners.forEach(detach => detach());
    }

    render() {
      return <Component {...this.props} />;
    }

  }

  WithSync.contextTypes = {
    router: React.PropTypes.func.isRequired
  };

  return WithSync;
}
