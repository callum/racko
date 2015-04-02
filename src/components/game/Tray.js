import React from 'react';
import withFirebase from '../shared/withFirebase';

export class Tray extends React.Component {

  static getDefaultData() {
    return {
      discardHead: null
    };
  }

  static addDataHandlers() {
    this.discardHead = this.firebase.child('trays').child(this.props.gameKey).child('discard/0');

    this.handlers.discardHead = this.discardHead.on('value', res => {
      if (res.exists()) {
        this.setState({
          discardHead: res.val()
        });
      }
    });
  }

  static removeDataHandlers() {
    this.discardHead.off('value', this.handlers.rack);
  }

  render() {
    return (
      <div>
        <h2>Tray</h2>

        <p>Discarded <b>{this.props.discardHead}</b></p>
      </div>
    );
  }

}

export default withFirebase(Tray);
