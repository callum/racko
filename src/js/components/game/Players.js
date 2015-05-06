import React from 'react';
import GameStore from '../../stores/GameStore';
import Player from './Player';
import withFlux from '../shared/withFlux';

class Players extends React.Component {

  static propTypes = {
    players: React.PropTypes.object.isRequired
  };

  render() {
    const { players } = this.props;

    return (
      <section className="players">
        <ul className="players__list">
          {players.map(player => {
            return (
              <li key={player.get('id')} className="players__item">
                <Player {...this.props} player={player} />
              </li>
            );
          })}
        </ul>
      </section>
    );
  }

}

function getter() {
  return {
    players: GameStore.getPlayers(this.props.game.get('id'))
  };
}

const PlayersWithFlux = withFlux(Players, getter, GameStore);

export default PlayersWithFlux;
