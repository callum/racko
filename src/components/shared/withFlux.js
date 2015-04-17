import React from 'react';

export default function withFlux(Component, getter, ...stores) {
  class WithFlux extends React.Component {

    constructor() {
      super();

      this.update = this.update.bind(this);
    }

    update() {
      this.setState(getter.call(this));
    }

    componentWillMount() {
      this.update();

      stores.forEach(store => store.addChangeListener(this.update));
    }

    componentWillUnmount() {
      stores.forEach(store => store.removeChangeListener(this.update));
    }

    render() {
      return <Component {...this.props} {...this.state} />;
    }

  }

  WithFlux.contextTypes = {
    router: React.PropTypes.func.isRequired
  };

  return WithFlux;
}
