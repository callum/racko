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
    partialGame: React.PropTypes.object.isRequired,
    game: React.PropTypes.object.isRequired
  };

  render() {
    const { partialGame, game } = this.props;

    return (
      <article className="home-game">
        <Link to="game" params={{ gameId: partialGame.get('id') }}>
          {game.size ? GameUtils.getPlayerList(game) : 'Loading…'}
        </Link>

        <footer className="home-game__footer">
          <Time
            dateTime={partialGame.get('updatedAt')}
            className="home-game__timestamp"
          />
        </footer>
      </article>
    );
  }

}

function syncer() {
  return [
    GameSynchronizer.get(this.props.partialGame.get('id'))
  ];
}

function getter() {
  return {
    game: GameStore.get(this.props.partialGame.get('id'))
  };
}

const GameWithSync = withSync(Game, syncer);
const GameWithFlux = withFlux(GameWithSync, getter, GameStore);

export default GameWithFlux;
