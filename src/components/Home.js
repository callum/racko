import React from 'react';
import { Link } from 'react-router';

import GameActions from '../actions/GameActions';

export class Home extends React.Component {

  static propTypes = {
    user: React.PropTypes.object.isRequired
  };

  createGame() {
    GameActions.create(this.props.user.get('id'));
  }

  render() {
    return (
      <div>
        <h2>Games</h2>

        <ul>
          {this.props.user.get('games', []).map((value, key) => {
            return (
              <li key={key}>
                <Link to="game" params={{ gameId: key }}>{key}</Link>
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

export default Home;
