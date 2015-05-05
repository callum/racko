import React from 'react';
import { Link } from 'react-router';

import GameStore from '../../stores/GameStore';
import GameSynchronizer from '../../synchronizers/GameSynchronizer';
import GameUtils from '../../utils/GameUtils';

import Time from '../shared/Time';
import withFlux from '../shared/withFlux';
import withSync from '../shared/withSync';

class Game extends React.Component {

  static propTypes = {
    game: React.PropTypes.object.isRequired
  };

  render() {
    const { game } = this.props;

    if (game.size) {
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

    return <div>Loading…</div>;
  }

}

function syncer() {
  return [
    GameSynchronizer.get(this.props.gameId)
  ];
}

function getter() {
  return {
    game: GameStore.get(this.props.gameId)
  };
}

const GameWithSync = withSync(Game, syncer);
const GameWithFlux = withFlux(GameWithSync, getter, GameStore);

export default GameWithFlux;
