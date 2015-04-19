import React from 'react';

import PlayerSynchronizer from '../../synchronizers/PlayerSynchronizer';
import PlayerStore from '../../stores/PlayerStore';

import withSync from '../shared/withSync';
import withFlux from '../shared/withFlux';

export default class Players extends React.Component {

  static propTypes = {
    game: React.PropTypes.object,
    players: React.PropTypes.object
  }

  render() {
    const { game, players } = this.props;

    return (
      <div>
        <h2>Players</h2>

        <ul>
          {players.map(player => {
            let name = player.get('name');

            if (game.get('turn') === player.get('id')) {
              name = <b>{name}</b>;
            }

            return (
              <li key={player.get('id')}>
                {name}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

}

function syncer() {
  const { gameId } = this.context.router.getCurrentParams();

  return [
    PlayerSynchronizer.getAll(gameId)
  ];
}

function getter() {
  const { gameId } = this.context.router.getCurrentParams();

  return {
    players: PlayerStore.getAll(gameId)
  };
}

const PlayersWithSync = withSync(Players, syncer);
const PlayersWithFlux = withFlux(PlayersWithSync, getter, PlayerStore);

export default PlayersWithFlux;
