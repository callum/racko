import React from 'react';

export default function withFlux(Component, getter, ...stores) {
  class WithFlux extends React.Component {

    constructor() {
      this.update = this.update.bind(this);
    }

    update() {
      this.setState(getter.call(this));
    }

    componentDidMount() {
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

  return WithFlux;
}
