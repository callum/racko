import styles from './Discard.css';

import React from 'react';

import GameActions from '../../../actions/GameActions';
import TrayService from '../../../services/TrayService';

import Card from '../shared/Card';

export default class Discard extends React.Component {

  static propTypes = {
    user: React.PropTypes.object.isRequired,
    game: React.PropTypes.object.isRequired,
    drawTail: React.PropTypes.number,
    discardHead: React.PropTypes.number.isRequired
  };

  discard() {
    const { user, game, drawTail } = this.props;

    TrayService.discard(game.get('id'), drawTail);

    GameActions.endTurn(game.get('id'), user.get('id'));
  }

  render() {
    const { drawTail, discardHead } = this.props;

    let onClick;
    let root = styles.root;

    if (drawTail) {
      onClick = this.discard.bind(this);
      root = styles.activated;
    }

    return (
      <div className={root}>
        <h2 className={styles.heading}>
          Discard pile
        </h2>

        <div onClick={onClick} className={styles.item}>
          <Card value={discardHead} />
        </div>
      </div>
    );
  }

}
