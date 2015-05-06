import React from 'react';

import RackActions from '../../actions/RackActions';
import RackHelper from '../../helpers/RackHelper';
import DrawStore from '../../stores/DrawStore';
import RackStore from '../../stores/RackStore';
import RackSynchronizer from '../../synchronizers/RackSynchronizer';

import Card from './shared/Card';
import withFlux from '../shared/withFlux';
import withSync from '../shared/withSync';

class Rack extends React.Component {

  static propTypes = {
    user: React.PropTypes.object.isRequired,
    game: React.PropTypes.object.isRequired,
    rack: React.PropTypes.object.isRequired,
    drawTail: React.PropTypes.number.isRequired,
    gameHelper: React.PropTypes.object.isRequired,
    rackHelper: React.PropTypes.object.isRequired
  };

  swap(item, key) {
    const { user, game, drawTail } = this.props;

    RackActions.swap(game.get('id'), user.get('id'), item, key, drawTail);
  }

  render() {
    const { rack, drawTail, rackHelper: { run } } = this.props;

    let slot = rack.size + 1;

    return (
      <section className="rack">
        <h2 className="rack__heading">
          Your rack
        </h2>

        {rack.reverse().map((value, key) => {
          let textValue = value;

          if (run && run.indexOf(value) !== -1) {
            textValue = <i>{value}</i>;
          }

          let onClick;

          if (drawTail) {
            onClick = this.swap.bind(this, value, key);
          }

          return (
            <div key={value} className="rack__slot">
              <span className="rack__slot__number">
                {--slot * 5}
              </span>

              <div className="rack__slot__item">
                <Card value={value} textValue={textValue} onClick={onClick} />
              </div>
            </div>
          );
        })}
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
