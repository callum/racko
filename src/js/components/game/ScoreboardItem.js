import React from 'react';

import ScoreHelper from '../../helpers/ScoreHelper';
import RackStore from '../../stores/RackStore';
import RackSynchronizer from '../../synchronizers/RackSynchronizer';

import withFlux from '../shared/withFlux';
import withSync from '../shared/withSync';

class ScoreboardItem extends React.Component {

  static propTypes = {
    key: React.PropTypes.string.isRequired,
    player: React.PropTypes.object.isRequired,
    scoreHelper: React.PropTypes.object.isRequired,
  };

  render() {
    const { key, player, scoreHelper } = this.props;

    return (
      <tr key={key} className="scoreboard__row">
        <td className="scoreboard__value">
          {player.get('name')}
        </td>
        <td className="scoreboard__value">
          {scoreHelper.points}
        </td>
        <td className="scoreboard__value">
          {scoreHelper.bonus}
        </td>
        <td className="scoreboard__value scoreboard__value--total">
          {scoreHelper.total}
        </td>
      </tr>
    );
  }

}

function syncer() {
  return [
    RackSynchronizer.get(this.props.game.get('id'), this.props.player.get('id'))
  ];
}

function getter() {
  const { game, player } = this.props;

  const rack = RackStore.get(game.get('id'), player.get('id'));
  const didRacko = game.get('winner') === player.get('id');

  return {
    scoreHelper: new ScoreHelper(rack, didRacko)
  };
}

const ScoreboardItemWithSync = withSync(ScoreboardItem, syncer);
const ScoreboardItemWithFlux = withFlux(ScoreboardItemWithSync, getter, RackStore);

export default ScoreboardItemWithFlux;
