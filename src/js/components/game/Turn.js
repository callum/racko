import React from 'react';

import DrawStore from '../../stores/DrawStore';
import TrayService from '../../services/TrayService';
import GameActions from '../../actions/GameActions';

import withFlux from '../shared/withFlux';

export class Turn extends React.Component {

  static propTypes = {
    user: React.PropTypes.object.isRequired,
    game: React.PropTypes.object.isRequired,
    drawTail: React.PropTypes.number.isRequired
  };

  startTurn() {
    TrayService.getDrawTail(this.props.game.get('id'));
  }

  discard() {
    const { user, game, drawTail } = this.props;

    TrayService.discard(game.get('id'), drawTail);

    GameActions.endTurn(game.get('id'), user.get('id'));
  }

  render() {
    const { drawTail } = this.props;

    if (!drawTail) {
      return (
        <button onClick={this.startTurn.bind(this)}>
          Take turn
        </button>
      );
    }

    return (
      <div>
        <p>
          You picked up <b>{drawTail}</b>
        </p>

        <button onClick={this.discard.bind(this)}>
          Discard
        </button>
      </div>
    );
  }

}

function getter() {
  const { gameId } = this.context.router.getCurrentParams();

  return {
    drawTail: DrawStore.getTail(gameId)
  };
}

const TurnWithFlux = withFlux(Turn, getter, DrawStore);

export default TurnWithFlux;
