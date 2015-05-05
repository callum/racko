import React from 'react';
import { Link } from 'react-router';

import GameSynchronizer from '../../synchronizers/GameSynchronizer';
import GameStore from '../../stores/GameStore';
import GameUtils from '../../utils/GameUtils';

import Time from '../shared/Time';
import withSync from '../shared/withSync';
import withFlux from '../shared/withFlux';

export class Game extends React.Component {

  static propTypes = {
    gameId: React.PropTypes.string.isRequired,
    game: React.PropTypes.object.isRequired,
    players: React.PropTypes.object.isRequired
  };

  render() {
    const { game } = this.props;

    if (!game.size) {
      return <div>Loading…</div>;
    }

    return (
      <article>
        <Link to="game" params={{ gameId: game.get('id') }}>
          {GameUtils.getPlayerList(game)}
        </Link>

        <div>
          <Time dateTime={game.get('updatedAt')} />
        </div>
      </article>
    );
  }

}

function syncer() {
  return [
    GameSynchronizer.get(this.props.gameId)
  ];
}

function getter() {
  const { gameId } = this.props;

  return {
    game: GameStore.get(gameId),
    players: GameStore.getPlayers(gameId)
  };
}

const GameWithSync = withSync(Game, syncer);
const GameWithFlux = withFlux(GameWithSync, getter, GameStore);

export default GameWithFlux;
