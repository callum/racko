import React from 'react';

import GameActions from '../../actions/GameActions';
import RackSynchronizer from '../../synchronizers/RackSynchronizer';
import RackStore from '../../stores/RackStore';
import RackActions from '../../actions/RackActions';
import DrawStore from '../../stores/DrawStore';

import withSync from '../shared/withSync';
import withFlux from '../shared/withFlux';

import Card from './shared/Card';

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

    let slot = rack.size + 1;

    return (
      <section className="rack">
        <h2 className="rack__heading">
          Your rack
        </h2>

        {rack.reverse().map((item, key) => {
          let onClick;

          if (drawTail) {
            onClick = this.swap.bind(this, item, key);
          }

          return (
            <div key={item} className="rack__slot">
              <span className="rack__slot__number">
                {--slot * 5}
              </span>

              <div className="rack__slot__item">
                <Card value={item} onClick={onClick} />
              </div>
            </div>
          );
        })}

        {gameHelper.isStarted && rackHelper.isRacko && (
          <button onClick={this.endGame.bind(this)}>
            Call Rack-O!
          </button>
        )}
      </section>
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
