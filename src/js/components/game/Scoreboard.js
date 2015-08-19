import styles from './Scoreboard.css';

import React from 'react';
import ScoreboardItem from './ScoreboardItem';

export default class Scoreboard extends React.Component {

  static propTypes = {
    game: React.PropTypes.object.isRequired
  };

  render() {
    const { game } = this.props;

    return (
      <section className={styles.root}>
        <h2 className={styles.heading}>
          Scoreboard
        </h2>

        <table className={styles.table}>
          <thead>
            <tr className={styles.row}>
              <th className={styles.label}>Player</th>
              <th className={styles.label}>Points</th>
              <th className={styles.label}>Bonus points</th>
              <th className={styles.label}>Total</th>
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
