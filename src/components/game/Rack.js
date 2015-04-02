import React from 'react';
import withFirebase from '../shared/withFirebase';

export class Rack extends React.Component {

  static getDefaultData() {
    return {
      rack: []
    };
  }

  static addDataHandlers() {
    let { uid } = this.firebase.getAuth();

    this.rack = this.firebase.child('racks').child(this.props.gameKey).child(uid);

    this.handlers.rack = this.rack.on('value', res => {
      if (res.exists()) {
        this.setState({
          rack: res.val()
        });
      }
    });
  }

  static removeDataHandlers() {
    this.rack.off('value', this.handlers.rack);
  }

  render() {
    return (
      <div>
        <h2>Rack</h2>

        <ul>
          {this.props.rack.map(card => {
            return (
              <li key={card}>
                {card}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

}

export default withFirebase(Rack);
