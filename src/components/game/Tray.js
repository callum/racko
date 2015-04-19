import React from 'react';

import DiscardSynchronizer from '../../synchronizers/DiscardSynchronizer';
import DiscardStore from '../../stores/DiscardStore';

import withSync from '../shared/withSync';
import withFlux from '../shared/withFlux';

export class Tray extends React.Component {

  static propTypes = {
    discard: React.PropTypes.object
  }

  render() {
    return (
      <div>
        <h2>Tray</h2>

        <div>Discard head: {this.props.discard.first()}</div>
      </div>
    );
  }

}

function syncer() {
  const { gameId } = this.context.router.getCurrentParams();

  return [
    DiscardSynchronizer.get(gameId)
  ];
}

function getter() {
  const { gameId } = this.context.router.getCurrentParams();

  return {
    discard: DiscardStore.get(gameId)
  };
}

const TrayWithSync = withSync(Tray, syncer);
const TrayWithFlux = withFlux(TrayWithSync, getter, DiscardStore);

export default TrayWithFlux;
