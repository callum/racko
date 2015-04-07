import React from 'react';
import Immutable from 'immutable';

import RackSynchronizer from '../../synchronizers/RackSynchronizer';
import RackStore from '../../stores/RackStore';

import withSync from '../shared/withSync';
import withFlux from '../shared/withFlux';

export class Rack extends React.Component {

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

Rack.propTypes = {
  rack: React.PropTypes.object
};

Rack.defaultProps = {
  rack: Immutable.OrderedSet()
};

function syncer() {
  return [
    RackSynchronizer.get(this.props.params.id, this.props.user.id)
  ];
}

function getter() {
  return {
    rack: RackStore.get(this.props.params.id, this.props.user.id)
  };
}

const RackWithSync = withSync(Rack, syncer);
const RackWithFlux = withFlux(RackWithSync, getter, RackStore);

export default RackWithFlux;
