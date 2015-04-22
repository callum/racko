import React from 'react';

import GameSynchronizer from '../synchronizers/GameSynchronizer';
import GameStore from '../stores/GameStore';
import GameActions from '../actions/GameActions';
import PlayerSynchronizer from '../synchronizers/PlayerSynchronizer';
import PlayerStore from '../stores/PlayerStore';

import Players from './game/Players';
import Rack from './game/Rack';
import Tray from './game/Tray';
import Turn from './game/Turn';

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
      <div>
        {gameHelper.isCreated &&
         gameHelper.canStart &&
         gameHelper.isHost(user) && (
          <button onClick={this.startGame.bind(this)}>
            Start game
          </button>
        )}

        {gameHelper.isEnded && (
          <p>{gameHelper.winnerName} wins!</p>
        )}

        <Players {...props} />

        {gameHelper.isStarted && (
          <Tray {...props} />
        )}

        {gameHelper.isStarted && (
          <Rack {...props} />
        )}

        {gameHelper.isStarted && gameHelper.isTurn(user) && (
          <Turn {...props} />
        )}
      </div>
    );
  }

}

function syncer() {
  const { gameId } = this.context.router.getCurrentParams();

  return [
    GameSynchronizer.get(gameId),
    PlayerSynchronizer.getAll(gameId)
  ];
}

function getter() {
  const { gameId } = this.context.router.getCurrentParams();

  const game = GameStore.get(gameId);
  const players = PlayerStore.getAll(gameId);

  return {
    game,
    players,
    gameHelper: new GameHelper(game, players)
  };
}

const GameWithSync = withSync(Game, syncer);
const GameWithFlux = withFlux(GameWithSync, getter, GameStore, PlayerStore);

export default GameWithFlux;
