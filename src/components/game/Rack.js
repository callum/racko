import React from 'react';

import RackSynchronizer from '../../synchronizers/RackSynchronizer';
import RackStore from '../../stores/RackStore';

import withSync from '../shared/withSync';
import withFlux from '../shared/withFlux';

export class Rack extends React.Component {

  static propTypes = {
    rack: React.PropTypes.object
  }

  render() {
    const { rack } = this.props;

    return (
      <div>
        <h2>Rack</h2>

        <ul>
          {rack.map(card => {
            return (
              <li key={card}>
                {card}
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
    RackSynchronizer.get(gameId, this.props.user.get('id'))
  ];
}

function getter() {
  const { gameId } = this.context.router.getCurrentParams();

  return {
    rack: RackStore.get(gameId, this.props.user.get('id'))
  };
}

const RackWithSync = withSync(Rack, syncer);
const RackWithFlux = withFlux(RackWithSync, getter, RackStore);

export default RackWithFlux;
