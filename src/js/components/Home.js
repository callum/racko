import React from 'react';

import UserStore from '../stores/UserStore';
import GameActions from '../actions/GameActions';

import Game from './home/Game';

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
      <main className="home">
        <h2 className="home__heading">
          Games
        </h2>

        <ul className="home__games">
          {this.props.games.map((game, key) => {
            return (
              <li key={key} className="home__game">
                <Game gameId={game.get('id')} />
              </li>
            );
          })}
        </ul>

        <button
          onClick={this.createGame.bind(this)}
          className="home__create-game">
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
