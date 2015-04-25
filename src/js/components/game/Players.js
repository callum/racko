import React from 'react';
import PlayerActions from '../../actions/PlayerActions';

export default class Players extends React.Component {

  static propTypes = {
    user: React.PropTypes.object.isRequired,
    game: React.PropTypes.object.isRequired,
    players: React.PropTypes.object.isRequired,
    gameHelper: React.PropTypes.object.isRequired
  };

  joinGame() {
    const { user, game } = this.props;

    PlayerActions.create(game.get('id'), user.get('id'));
  }

  render() {
    const { user, players, gameHelper } = this.props;

    return (
      <div>
        <h2>Players</h2>

        <ul>
          {players.map(player => {
            let name = player.get('name');

            if (gameHelper.isTurn(player)) {
              name = <b>{name}</b>;
            }

            return (
              <li key={player.get('id')}>
                {name}
              </li>
            );
          })}
        </ul>

        {gameHelper.isCreated &&
         gameHelper.canJoin &&
         !gameHelper.isJoined(user) && (
          <button onClick={this.joinGame.bind(this)}>
            Join
          </button>
        )}
      </div>
    );
  }

}
