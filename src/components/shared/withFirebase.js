import React from 'react';
import Firebase from 'firebase';

const FIREBASE = 'https://dazzling-heat-6913.firebaseio.com/';

export default function withFirebase(Component) {
  class WithFirebase extends React.Component {

    constructor() {
      this.firebase = new Firebase(FIREBASE);
      this.handlers = {};
      this.state = Component.getDefaultData();
    }

    componentDidMount() {
      Component.addDataHandlers.call(this);
    }

    componentWillUnmount() {
      Component.removeDataHandlers.call(this);
    }

    render() {
      return (
        <Component
          firebase={this.firebase} {...this.props} {...this.state}
        />
      );
    }

  }

  WithFirebase.contextTypes = {
    router: React.PropTypes.func.isRequired
  };

  return WithFirebase;
}
