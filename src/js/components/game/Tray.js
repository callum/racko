import React from 'react';

import DrawStore from '../../stores/DrawStore';
import DiscardStore from '../../stores/DiscardStore';
import DiscardSynchronizer from '../../synchronizers/DiscardSynchronizer';

import Discard from './tray/Discard';
import Draw from './tray/Draw';

import withSync from '../shared/withSync';
import withFlux from '../shared/withFlux';

class Tray extends React.Component {

  static propTypes = {
    drawTail: React.PropTypes.number,
    discardHead: React.PropTypes.number
  };

  render() {
    const { props } = this;
    const { discardHead } = props;

    return (
      <section className="tray">
        <div className="tray__draw">
          <Draw {...props} />
        </div>

        {discardHead && (
          <div className="tray__discard">
            <Discard {...props} />
          </div>
        )}
      </section>
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
    drawTail: DrawStore.getTail(gameId),
    discardHead: DiscardStore.getHead(gameId)
  };
}

const TrayWithSync = withSync(Tray, syncer);
const TrayWithFlux = withFlux(TrayWithSync, getter, DrawStore, DiscardStore);

export default TrayWithFlux;
