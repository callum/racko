import React from 'react';
import human from 'human-time';

class Time extends React.Component {

  static propTypes = {
    dateTime: React.PropTypes.string.isRequired
  };

  componentDidMount() {
    this.interval = window.setInterval(() => this.forceUpdate(), 1000);
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  render() {
    const { dateTime } = this.props;

    return (
      <time {...this.props} dateTime={dateTime}>
        Last active {human(new Date(dateTime))}
      </time>
    );
  }

}

export default Time;
