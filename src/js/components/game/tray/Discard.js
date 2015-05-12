import React from 'react';
import classNames from 'classnames';

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

    if (drawTail) {
      onClick = this.discard.bind(this);
    }

    const classes = classNames({
      'discard': true,
      'discard--activated': drawTail
    });

    return (
      <div className={classes}>
        <h2 className="discard__heading">
          Discard pile
        </h2>

        <div onClick={onClick} className="discard__item">
          <Card value={discardHead} />
        </div>
      </div>
    );
  }

}
