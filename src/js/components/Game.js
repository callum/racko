import styles from './Game.css';

import React from 'react';

import GameActions from '../actions/GameActions';
import GameHelper from '../helpers/GameHelper';
import GameStore from '../stores/GameStore';
import GameSynchronizer from '../synchronizers/GameSynchronizer';

import Players from './game/Players';
import Rack from './game/Rack';
import Scoreboard from './game/Scoreboard';
import Tray from './game/Tray';

import withFlux from './shared/withFlux';
import withSync from './shared/withSync';

class Game extends React.Component {

  static propTypes = {
    user: React.PropTypes.object.isRequired,
    game: React.PropTypes.object.isRequired,
    gameHelper: React.PropTypes.object.isRequired
  };

  startGame() {
    const { game } = this.props;

    GameActions.start(game.get('id'));
  }

  endGame() {
    const { user, game } = this.props;

    GameActions.end(game.get('id'), user.get('id'));
  }

  joinGame() {
    const { user, game } = this.props;

    GameActions.join(game.get('id'), user.get('id'));
  }

  render() {
    const { props } = this;
    const { user, gameHelper, rackHelper } = props;

    return (
      <main className={styles.root}>
        <aside className={styles.sidebar}>
          <Players {...props} />
        </aside>

        <div className={styles.body}>
          {gameHelper.isCreated &&
           gameHelper.canStart &&
           gameHelper.isHost(user) && (
            <button
              onClick={this.startGame.bind(this)}
              className={styles.start}>
              Start game
            </button>
          )}

          {gameHelper.isCreated &&
           gameHelper.canJoin &&
           !gameHelper.isJoined(user) && (
            <button
              onClick={this.joinGame.bind(this)}
              className={styles.join}>
              Join game
            </button>
          )}

          {gameHelper.isEnded && (
            <Scoreboard {...props} />
          )}

          {gameHelper.isStarted && (
            <Rack endGame={this.endGame.bind(this)} {...props} />
          )}

          {gameHelper.isStarted && (
            <Tray {...props} />
          )}
        </div>
      </main>
    );
  }

}

function syncer() {
  const { gameId } = this.context.router.getCurrentParams();

  return [
    GameSynchronizer.get(gameId)
  ];
}

function getter() {
  const { gameId } = this.context.router.getCurrentParams();

  const game = GameStore.get(gameId);

  return {
    game,
    gameHelper: new GameHelper(game)
  };
}

const GameWithSync = withSync(Game, syncer);
const GameWithFlux = withFlux(GameWithSync, getter, GameStore);

export default GameWithFlux;
