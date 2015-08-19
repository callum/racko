import styles from './Tray.css';

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
      <section className={styles.root}>
        <div className={styles.draw}>
          <Draw {...props} />
        </div>

        {discardHead && (
          <div>
            <Discard {...props} />
          </div>
        )}
      </section>
    );
  }

}

function syncer() {
  return [
    DiscardSynchronizer.get(this.props.game.get('id'))
  ];
}

function getter() {
  const gameId = this.props.game.get('id');

  return {
    drawTail: DrawStore.getTail(gameId),
    discardHead: DiscardStore.getHead(gameId)
  };
}

const TrayWithSync = withSync(Tray, syncer);
const TrayWithFlux = withFlux(TrayWithSync, getter, DrawStore, DiscardStore);

export default TrayWithFlux;
