import React from 'react';

import GameSynchronizer from '../synchronizers/GameSynchronizer';
import PlayerSynchronizer from '../synchronizers/PlayerSynchronizer';
import GameStore from '../stores/GameStore';
import PlayerStore from '../stores/PlayerStore';
import GameActions from '../actions/GameActions';
import PlayerActions from '../actions/PlayerActions';

import Players from './game/Players';
import Rack from './game/Rack';
import Tray from './game/Tray';

import withSync from './shared/withSync';
import withFlux from './shared/withFlux';

import GameUtils from '../utils/GameUtils';

export class Game extends React.Component {

  static propTypes = {
    user: React.PropTypes.object,
    game: React.PropTypes.object,
    players: React.PropTypes.object
  }

  join() {
    const { user, game } = this.props;

    PlayerActions.create(game.get('id'), user.get('id'));
  }

  start() {
    const gameId = this.props.game.get('id');

    const setup = GameUtils.setup(gameId);

    GameActions.start(gameId, setup);
  }

  render() {
    const createdAt = new Date(this.props.game.get('createdAt'));

    const isHost = this.props.game.get('host') === this.props.user.get('id');

    return (
      <div>
        <p>Created at {createdAt.toLocaleString('en-GB')}</p>

        <button onClick={this.join.bind(this)}>
          Join
        </button>

        {isHost && (
          <button onClick={this.start.bind(this)}>
            Start
          </button>
        )}

        <Players {...this.props} />

        <Tray {...this.props} />

        {this.props.user.size && <Rack {...this.props} />}
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

  return {
    game: GameStore.get(gameId),
    players: PlayerStore.getAll(gameId)
  };
}

const GameWithSync = withSync(Game, syncer);
const GameWithFlux = withFlux(GameWithSync, getter, GameStore, PlayerStore);

export default GameWithFlux;
