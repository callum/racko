import React from 'react';

import PlayerSynchronizer from '../../synchronizers/PlayerSynchronizer';
import PlayerStore from '../../stores/PlayerStore';
import PlayerActions from '../../actions/PlayerActions';

import withSync from '../shared/withSync';
import withFlux from '../shared/withFlux';

import GameUtils from '../../utils/GameUtils';

export default class Players extends React.Component {

  static propTypes = {
    user: React.PropTypes.object,
    game: React.PropTypes.object,
    players: React.PropTypes.object,
    isCreated: React.PropTypes.bool
  }

  joinGame() {
    const { user, game } = this.props;

    PlayerActions.create(game.get('id'), user.get('id'));
  }

  render() {
    const {
      user,
      game,
      players,
      isCreated
    } = this.props;

    const isJoined = GameUtils.isJoined(players, user);
    const isJoinable = players.size <= 4;

    return (
      <div>
        <h2>Players</h2>

        <ul>
          {players.map(player => {
            let name = player.get('name');

            if (GameUtils.isTurn(game, player)) {
              name = <b>{name}</b>;
            }

            return (
              <li key={player.get('id')}>
                {name}
              </li>
            );
          })}
        </ul>

        {isCreated && !isJoined && (
          <button onClick={this.joinGame.bind(this)} disabled={!isJoinable}>
            Join
          </button>
        )}
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
