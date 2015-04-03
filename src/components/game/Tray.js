import React from 'react';

export default class Tray extends React.Component {

  render() {
    return (
      <div>
        <h2>Tray</h2>

        <p>Discarded <b>{this.props.discardHead}</b></p>
      </div>
    );
  }

}
