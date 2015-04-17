import React from 'react';

export default class Players extends React.Component {

  static propTypes = {
    game: React.PropTypes.object,
    players: React.PropTypes.object
  }

  render() {
    const { game, players } = this.props;

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
