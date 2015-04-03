import React from 'react';
import Immutable from 'immutable';

export default class Players extends React.Component {

  render() {
    let { game, players } = this.props;

    return (
      <div>
        <h2>Players</h2>

        <ul>
          {players.map(player => {
            let name = player.get('name');

            if (game.get('turn') === player.get('id')) {
              name = <b>{name}</b>;
            }

            return (
              <li key={player.get('id')}>
                {name}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

}

Players.propTypes = {
  game: React.PropTypes.object,
  players: React.PropTypes.object
};

Players.defaultProps = {
  game: Immutable.Map(),
  players: Immutable.Set()
};
