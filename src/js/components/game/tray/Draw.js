import React from 'react';
import classNames from 'classnames';

import TrayService from '../../../services/TrayService';

import Card from '../shared/Card';

class Draw extends React.Component {

  static propTypes = {
    game: React.PropTypes.object.isRequired,
    user: React.PropTypes.object.isRequired,
    drawTail: React.PropTypes.number.isRequired,
    gameHelper: React.PropTypes.object.isRequired
  };

  take() {
    TrayService.getDrawTail(this.props.game.get('id'));
  }

  render() {
    const { user, drawTail, gameHelper } = this.props;

    const isTurn = gameHelper.isTurn(user);

    let onClick;

    if (isTurn) {
      onClick = this.take.bind(this);
    }

    let card = (
      <div onClick={onClick} className="draw__card">
        <div className="draw__card__logo">
          Rack-O
        </div>
      </div>
    );

    if (drawTail) {
      card = <Card value={drawTail} />;
    }

    const classes = classNames({
      'draw': true,
      'draw--activated': isTurn && !drawTail
    });

    return (
      <div className={classes}>
        <h2 className="draw__heading">
          Draw pile
        </h2>

        {card}
      </div>
    );
  }

}

export default Draw;
