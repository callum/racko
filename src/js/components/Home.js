import styles from './Home.css';

import React from 'react';

import GameActions from '../actions/GameActions';
import UserStore from '../stores/UserStore';

import Game from './home/Game';

import withFlux from './shared/withFlux';

class Home extends React.Component {

  static propTypes = {
    user: React.PropTypes.object.isRequired,
    games: React.PropTypes.object.isRequired
  };

  createGame() {
    GameActions.create(this.props.user.get('id'));
  }

  render() {
    return (
      <main className={styles.root}>
        <h2 className={styles.heading}>
          Games
        </h2>

        <ol className={styles.games}>
          {this.props.games.map((game, key) => {
            return (
              <li key={key} className={styles.game}>
                <Game partialGame={game} />
              </li>
            );
          })}
        </ol>

        <button
          onClick={this.createGame.bind(this)}
          className={styles.createGame}>
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
