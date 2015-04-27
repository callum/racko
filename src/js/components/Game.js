import React from 'react';

import GameSynchronizer from '../synchronizers/GameSynchronizer';
import GameStore from '../stores/GameStore';
import GameActions from '../actions/GameActions';

import Players from './game/Players';
import Rack from './game/Rack';
import Tray from './game/Tray';

import withSync from './shared/withSync';
import withFlux from './shared/withFlux';

import GameHelper from '../helpers/GameHelper';

export class Game extends React.Component {

  static propTypes = {
    user: React.PropTypes.object.isRequired,
    game: React.PropTypes.object.isRequired,
    gameHelper: React.PropTypes.object.isRequired
  };

  startGame() {
    const { game } = this.props;

    GameActions.start(game.get('id'));
  }

  render() {
    const { props } = this;
    const { user, gameHelper } = props;

    return (
      <main className="game">
        <aside className="game__sidebar">
          <Players {...props} />

          {gameHelper.isCreated &&
           gameHelper.canStart &&
           gameHelper.isHost(user) && (
            <button onClick={this.startGame.bind(this)}>
              Start game
            </button>
          )}
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

  return {
    game,
    players: GameStore.getPlayers(gameId),
    gameHelper: new GameHelper(game)
  };
}

const GameWithSync = withSync(Game, syncer);
const GameWithFlux = withFlux(GameWithSync, getter, GameStore);

export default GameWithFlux;
