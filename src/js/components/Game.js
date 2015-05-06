import React from 'react';

import GameActions from '../actions/GameActions';
import GameHelper from '../helpers/GameHelper';
import RackHelper from '../helpers/RackHelper';
import GameStore from '../stores/GameStore';
import RackStore from '../stores/RackStore';
import GameSynchronizer from '../synchronizers/GameSynchronizer';

import Players from './game/Players';
import Rack from './game/Rack';
import Tray from './game/Tray';

import withFlux from './shared/withFlux';
import withSync from './shared/withSync';

class Game extends React.Component {

  static propTypes = {
    user: React.PropTypes.object.isRequired,
    game: React.PropTypes.object.isRequired,
    gameHelper: React.PropTypes.object.isRequired,
    rackHelper: React.PropTypes.object.isRequired
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
      <main className="game">
        <aside className="game__sidebar">
          <Players {...props} />

          <div className="game__actions">
            {gameHelper.isCreated &&
             gameHelper.canStart &&
             gameHelper.isHost(user) && (
              <button
                onClick={this.startGame.bind(this)}
                className="game__start">
                Start game
              </button>
            )}

            {gameHelper.isStarted && rackHelper.isRacko && (
              <button
                onClick={this.endGame.bind(this)}
                className="game__end">
                Rack-O!
              </button>
            )}

            {gameHelper.isCreated &&
             gameHelper.canJoin &&
             !gameHelper.isJoined(user) && (
              <button
                onClick={this.joinGame.bind(this)}
                className="game__join">
                Join
              </button>
            )}
          </div>
        </aside>

        <div className="game__body">
          {gameHelper.isEnded && (
            <p>{gameHelper.winnerName} wins!</p>
          )}

          {gameHelper.isStarted && (
            <Rack {...props} />
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
  const rack = RackStore.get(gameId, this.props.user.get('id'));

  return {
    game,
    gameHelper: new GameHelper(game),
    rackHelper: new RackHelper(rack)
  };
}

const GameWithSync = withSync(Game, syncer);
const GameWithFlux = withFlux(GameWithSync, getter, GameStore, RackStore);

export default GameWithFlux;
