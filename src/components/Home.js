import React from 'react';
import { Link } from 'react-router';
import GameActions from '../actions/GameActions';

export default class Home extends React.Component {

  createGame() {
    GameActions.create(this.props.user);
  }

  render() {
    return (
      <div>
        <h2>Games</h2>

        <ul>
          {Object.keys(this.props.user.games).map(id => {
            return (
              <li key={id}>
                <Link to="game" params={{ id }}>{id}</Link>
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
