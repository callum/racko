import React from 'react';

import GameActions from '../../actions/GameActions';
import RackSynchronizer from '../../synchronizers/RackSynchronizer';
import RackStore from '../../stores/RackStore';
import RackActions from '../../actions/RackActions';
import DrawStore from '../../stores/DrawStore';

import withSync from '../shared/withSync';
import withFlux from '../shared/withFlux';

import RackHelper from '../../helpers/RackHelper';

export class Rack extends React.Component {

  static propTypes = {
    user: React.PropTypes.object.isRequired,
    game: React.PropTypes.object.isRequired,
    rack: React.PropTypes.object.isRequired,
    drawTail: React.PropTypes.number.isRequired,
    gameHelper: React.PropTypes.object.isRequired,
    rackHelper: React.PropTypes.object.isRequired
  };

  endGame() {
    const { user, game } = this.props;

    GameActions.end(game.get('id'), user.get('id'));
  }

  swap(item, key) {
    const { user, game, drawTail } = this.props;

    RackActions.swap(game.get('id'), user.get('id'), item, key, drawTail);
  }

  render() {
    const { rack, drawTail, gameHelper, rackHelper } = this.props;

    return (
      <div>
        <h2>Rack</h2>

        {gameHelper.isStarted && rackHelper.isRacko && (
          <button onClick={this.endGame.bind(this)}>
            Call Rack-O!
          </button>
        )}

        {rack.reverse().map((item, key) => {
          return (
            <div key={item}>
              <span>{(parseInt(key, 10) + 1) * 5} </span>

              <button
                onClick={this.swap.bind(this, item, key)}
                disabled={!drawTail}>
                {item}
              </button>
            </div>
          );
        })}
      </div>
    );
  }

}

function syncer() {
  const { gameId } = this.context.router.getCurrentParams();

  return [
    RackSynchronizer.get(gameId, this.props.user.get('id'))
  ];
}

function getter() {
  const { gameId } = this.context.router.getCurrentParams();

  const rack = RackStore.get(gameId, this.props.user.get('id'));

  return {
    rack,
    drawTail: DrawStore.getTail(gameId),
    rackHelper: new RackHelper(rack)
  };
}

const RackWithSync = withSync(Rack, syncer);
const RackWithFlux = withFlux(RackWithSync, getter, RackStore, DrawStore);

export default RackWithFlux;
