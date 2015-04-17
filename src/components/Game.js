import React from 'react';

import GameSynchronizer from '../synchronizers/GameSynchronizer';
import PlayerSynchronizer from '../synchronizers/PlayerSynchronizer';
import GameStore from '../stores/GameStore';
import PlayerStore from '../stores/PlayerStore';
import PlayerActions from '../actions/PlayerActions';

import Players from './game/Players';

import withSync from './shared/withSync';
import withFlux from './shared/withFlux';

export class Game extends React.Component {

  join() {
    const { user, game } = this.props;

    PlayerActions.create(game.get('id'), user.get('id'));
  }

  render() {
    const createdAt = new Date(this.props.game.get('createdAt'));

    return (
      <div>
        <p>Created at {createdAt.toLocaleString('en-GB')}</p>

        <button onClick={this.join.bind(this)}>
          Join
        </button>

        <Players {...this.props} />
      </div>
    );
  }

}

Game.propTypes = {
  user: React.PropTypes.object,
  game: React.PropTypes.object,
  players: React.PropTypes.object
};

function syncer() {
  const { id } = this.context.router.getCurrentParams();

  return [
    GameSynchronizer.get(id),
    PlayerSynchronizer.getAll(id)
  ];
}

function getter() {
  const { id } = this.context.router.getCurrentParams();

  return {
    game: GameStore.get(id),
    players: PlayerStore.getAll(id)
  };
}

const GameWithSync = withSync(Game, syncer);
const GameWithFlux = withFlux(GameWithSync, getter, GameStore, PlayerStore);

export default GameWithFlux;
