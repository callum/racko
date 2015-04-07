import React from 'react';

export default function withFirebase(Component, syncer) {
  class WithSync extends React.Component {

    componentDidMount() {
      this.listeners = syncer.call(this);
    }

    componentWillUnmount() {
      this.listeners.forEach(detach => detach());
    }

    render() {
      return <Component {...this.props} />;
    }

  }

  return WithSync;
}
