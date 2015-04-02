import React from 'react';

function withFlux(Component, ...stores) {
  class WithFlux extends React.Component {

    getInitialState() {
      return Component.initialData.call(this);
    }

    componentDidMount() {
      stores.forEach(store => store.on('change', this.onChange));
    }

    componentWillUnmount() {
      stores.forEach(store => store.off('change', this.onChange));
    }

    onChange() {
      this.setState(Component.initialData.call(this));
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
