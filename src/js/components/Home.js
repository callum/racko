import React from 'react';
import { Link } from 'react-router';

import UserStore from '../stores/UserStore';
import GameActions from '../actions/GameActions';

import withFlux from './shared/withFlux';

export class Home extends React.Component {

  static propTypes = {
    user: React.PropTypes.object.isRequired,
    games: React.PropTypes.object.isRequired
  };

  createGame() {
    GameActions.create(this.props.user.get('id'));
  }

  render() {
    return (
      <main>
        <h2>Games</h2>

        <ul>
          {this.props.games.map((game, key) => {
            return (
              <li key={key}>
                <Link to="game" params={{ gameId: key }}>
                  {new Date(game.get('createdAt')).toLocaleString('en-GB')}
                </Link>
              </li>
            );
          })}
        </ul>

        <button onClick={this.createGame.bind(this)}>
          Create game
        </button>
      </main>
    );
  }

}

function getter() {
  return {
    games: UserStore.getGames(this.props.user.get('id'))
  };
}

const HomeWithFlux = withFlux(Home, getter, UserStore);

export default HomeWithFlux;
