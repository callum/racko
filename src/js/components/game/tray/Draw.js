import styles from './Draw.css';

import React from 'react';

import TrayService from '../../../services/TrayService';

import Card from '../shared/Card';

export default class Draw extends React.Component {

  static propTypes = {
    game: React.PropTypes.object.isRequired,
    user: React.PropTypes.object.isRequired,
    drawTail: React.PropTypes.number,
    gameHelper: React.PropTypes.object.isRequired
  };

  take() {
    TrayService.getDrawTail(this.props.game.get('id'));
  }

  render() {
    const { user, drawTail, gameHelper } = this.props;

    const isTurn = gameHelper.isTurn(user);

    let onClick;
    let root = styles.root;

    if (isTurn) {
      onClick = this.take.bind(this);

      if (!drawTail) {
        root = styles.activated;
      }
    }

    let card = (
      <div onClick={onClick} className={styles.card}>
        <div className={styles.logo}>
          Rack-O
        </div>
      </div>
    );

    if (drawTail) {
      card = <Card value={drawTail} />;
    }

    return (
      <div className={root}>
        <h2 className={styles.heading}>
          Draw pile
        </h2>

        {card}
      </div>
    );
  }

}
