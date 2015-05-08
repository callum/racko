import React from 'react';
import human from 'human-time';

export default class Time extends React.Component {

  static propTypes = {
    dateTime: React.PropTypes.number.isRequired
  };

  componentDidMount() {
    this.interval = window.setInterval(() => this.forceUpdate(), 1000);
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  render() {
    const dateTime = new Date(this.props.dateTime);

    return (
      <time {...this.props} dateTime={dateTime.toISOString()}>
        Last active {human(dateTime)}
      </time>
    );
  }

}
