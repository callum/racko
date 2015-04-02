import React from 'react';
import { Link } from 'react-router';
import withFirebase from './shared/withFirebase';

export class Home extends React.Component {

  static getDefaultData() {
    return {
      games: {}
    };
  }

  static addDataHandlers() {
    this.handlers.onAuth = (res) => {
      this.games = this.firebase.child('users').child(res.uid).child('games');

      this.handlers.games = this.games.on('value', res => {
        if (res.exists()) {
          this.setState({
            games: res.val()
          });
        }
      });
    };

    this.firebase.onAuth(this.handlers.onAuth);
  }

  static removeDataHandlers() {
    this.firebase.offAuth(this.handlers.onAuth);
    this.games.off('value', this.handlers.games);
  }

  createGame() {
    let { uid } = this.props.firebase.getAuth();

    let game = this.props.firebase.child('games').push({
      state: 'created',
      host: uid
    });

    let key = game.key();

    this.props.firebase.child('users').child(uid).child('games').child(key).set(true);

    this.props.firebase.child('players').child(key).child(uid).set({
      name: this.props.user.name
    });
  }

  render() {
    return (
      <div>
        <h2>Games</h2>

        <ul>
          {Object.keys(this.props.games).map(key => {
            return (
              <li key={key}>
                <Link to="game" params={{ key }}>{key}</Link>
              </li>
            );
          })}
        </ul>

        <button onClick={this.createGame.bind(this)}>
          Create game
        </button>
      </div>
    );
  }

}

export default withFirebase(Home);
