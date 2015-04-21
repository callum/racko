import React from 'react';

import GameActions from '../../actions/GameActions';
import RackSynchronizer from '../../synchronizers/RackSynchronizer';
import RackStore from '../../stores/RackStore';
import RackActions from '../../actions/RackActions';
import DrawStore from '../../stores/DrawStore';

import withSync from '../shared/withSync';
import withFlux from '../shared/withFlux';

import RackUtils from '../../utils/RackUtils';

export class Rack extends React.Component {

  static propTypes = {
    user: React.PropTypes.object,
    game: React.PropTypes.object,
    rack: React.PropTypes.object,
    drawTail: React.PropTypes.number,
    isStarted: React.PropTypes.bool
  }

  endGame() {
    const { user, game } = this.props;

    GameActions.end(game.get('id'), user.get('id'));
  }

  swap(item, key) {
    const { user, game, drawTail } = this.props;

    RackActions.swap(game.get('id'), user.get('id'), item, key, drawTail);
  }

  render() {
    const { rack, drawTail, isStarted } = this.props;

    const isRacko = RackUtils.isRacko(rack);

    return (
      <div>
        <h2>Rack</h2>

        {isStarted && isRacko && (
          <button onClick={this.endGame.bind(this)}>
            Call Rack-O!
          </button>
        )}

        {rack.reverse().map((item, key) => {
          return (
            <div key={item}>
              <span>{parseInt(key, 10) + 1} </span>

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

  return {
    rack: RackStore.get(gameId, this.props.user.get('id')),
    drawTail: DrawStore.getTail(gameId)
  };
}

const RackWithSync = withSync(Rack, syncer);
const RackWithFlux = withFlux(RackWithSync, getter, RackStore, DrawStore);

export default RackWithFlux;
