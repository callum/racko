import styles from './Player.css';

import React from 'react';
import human from 'human-time';

import PresenceStore from '../../stores/PresenceStore';
import PresenceSynchronizer from '../../synchronizers/PresenceSynchronizer';

import withFlux from '../shared/withFlux';
import withSync from '../shared/withSync';

class Player extends React.Component {

  static propTypes = {
    player: React.PropTypes.object.isRequired,
    presence: React.PropTypes.object.isRequired,
    isConnected: React.PropTypes.bool.isRequired,
    gameHelper: React.PropTypes.object.isRequired
  };

  render() {
    const { player, presence, isConnected, gameHelper } = this.props;

    let name = player.get('name');

    if (gameHelper.isTurn(player)) {
      name = <b>{name}</b>;
    }

    let title, root;

    if (!isConnected) {
      title = `Last seen ${human(new Date(presence.get('seenAt')))}`;
      root = styles.root;
    } else {
      root = styles.isConnected;
    }

    return (
      <article title={title} className={root}>
        {name}
      </article>
    );
  }

}

function syncer() {
  return [
    PresenceSynchronizer.get(this.props.player.get('id'))
  ];
}

function getter() {
  const userId = this.props.player.get('id');

  return {
    presence: PresenceStore.get(userId),
    isConnected: PresenceStore.isConnected(userId)
  };
}

const PlayerWithSync = withSync(Player, syncer);
const PlayerWithFlux = withFlux(PlayerWithSync, getter, PresenceStore);

export default PlayerWithFlux;
