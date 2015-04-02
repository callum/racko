import React from 'react';

export default class Players extends React.Component {

  render() {
    let { game, players } = this.props;

    return (
      <div>
        <h2>Players</h2>

        {game &&
          <ul>
            {Object.keys(players).map(key => {
              let player = players[key];

              return (
                <li key={key}>
                  {game.turn === key ? <b>{player.name}</b> : player.name}
                </li>
              );
            })}
          </ul>
        }
      </div>
    );
  }

}
