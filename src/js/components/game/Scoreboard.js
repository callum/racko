import React from 'react';
import ScoreboardItem from './ScoreboardItem';

export default class Scoreboard extends React.Component {

  static propTypes = {
    game: React.PropTypes.object.isRequired
  };

  render() {
    const { game } = this.props;

    return (
      <section className="scoreboard">
        <h2 className="scoreboard__heading">
          Scoreboard
        </h2>

        <table className="scoreboard__table">
          <thead>
            <tr className="scoreboard__row">
              <th className="scoreboard__label">Player</th>
              <th className="scoreboard__label">Points</th>
              <th className="scoreboard__label">Bonus points</th>
              <th className="scoreboard__label">Total</th>
            </tr>
          </thead>
          <tbody>
            {game.get('players').map((player, key) => {
              return (
                <ScoreboardItem
                  key={key}
                  player={player}
                  {...this.props}
                />
              );
            })}
          </tbody>
        </table>
      </section>
    );
  }

}
