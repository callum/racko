import React from 'react';
import GameActions from '../../actions/GameActions';
import Player from './Player';

export default class Players extends React.Component {

  static propTypes = {
    user: React.PropTypes.object.isRequired,
    game: React.PropTypes.object.isRequired,
    players: React.PropTypes.object.isRequired,
    gameHelper: React.PropTypes.object.isRequired
  };

  joinGame() {
    const { user, game } = this.props;

    GameActions.join(game.get('id'), user.get('id'));
  }

  render() {
    const { user, players, gameHelper } = this.props;

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

        {gameHelper.isCreated &&
         gameHelper.canJoin &&
         !gameHelper.isJoined(user) && (
          <button onClick={this.joinGame.bind(this)}>
            Join
          </button>
        )}
      </section>
    );
  }

}
