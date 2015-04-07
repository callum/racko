import React from 'react';
import Immutable from 'immutable';

import GameSynchronizer from '../synchronizers/GameSynchronizer';
import PlayerSynchronizer from '../synchronizers/PlayerSynchronizer';
import GameStore from '../stores/GameStore';
import PlayerStore from '../stores/PlayerStore';

import Players from './game/Players';
import Rack from './game/Rack';
import Tray from './game/Tray';
import Turn from './game/Turn';

import withSync from './shared/withSync';
import withFlux from './shared/withFlux';

export class Game extends React.Component {

  render() {
    const isAuthenticated = this.props.user;

    return (
      <div>
        <Players {...this.props} />

        {isAuthenticated &&
          <Rack {...this.props} />
        }
      </div>
    );
  }

}

Game.propTypes = {
  game: React.PropTypes.object,
  players: React.PropTypes.object
};

Game.defaultProps = {
  game: Immutable.Map(),
  players: Immutable.Map()
};

function syncer() {
  const { id } = this.props.params;

  return [
    GameSynchronizer.get(id),
    PlayerSynchronizer.get(id)
  ];
}

function getter() {
  const { id } = this.props.params;

  return {
    game: GameStore.get(id),
    players: PlayerStore.get(id)
  };
}

const GameWithSync = withSync(Game, syncer);
const GameWithFlux = withFlux(GameWithSync, getter, GameStore, PlayerStore);

export default GameWithFlux;
