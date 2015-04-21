import React from 'react';

import GameSynchronizer from '../synchronizers/GameSynchronizer';
import GameStore from '../stores/GameStore';
import GameActions from '../actions/GameActions';

import Players from './game/Players';
import Rack from './game/Rack';
import Tray from './game/Tray';
import Turn from './game/Turn';

import withSync from './shared/withSync';
import withFlux from './shared/withFlux';

import GameUtils from '../utils/GameUtils';

export class Game extends React.Component {

  static propTypes = {
    user: React.PropTypes.object,
    game: React.PropTypes.object
  }

  startGame() {
    const { game } = this.props;

    const setup = GameUtils.setup(game);

    GameActions.start(game.get('id'), setup);
  }

  render() {
    const { props } = this;

    const {
      isHost,
      isTurn,
      isCreated,
      isStarted,
      isEnded
    } = props;

    return (
      <div>
        {isCreated && isHost && (
          <button onClick={this.startGame.bind(this)}>
            Start game
          </button>
        )}

        {isEnded && (
          <p>Game over!</p>
        )}

        <Players {...props} />

        {isStarted && <Tray {...props} />}
        {(isStarted || isEnded) && <Rack {...props} />}
        {isStarted && isTurn && <Turn {...props} />}
      </div>
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
  const { user } = this.props;

  const game = GameStore.get(gameId);

  return {
    game,
    isHost: GameUtils.isHost(game, user),
    isTurn: GameUtils.isTurn(game, user),
    isCreated: GameUtils.isCreated(game),
    isStarted: GameUtils.isStarted(game),
    isEnded: GameUtils.isEnded(game)
  };
}

const GameWithSync = withSync(Game, syncer);
const GameWithFlux = withFlux(GameWithSync, getter, GameStore);

export default GameWithFlux;
