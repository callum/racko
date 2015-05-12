import React from 'react';

import RackActions from '../../actions/RackActions';
import RackHelper from '../../helpers/RackHelper';
import DrawStore from '../../stores/DrawStore';
import RackStore from '../../stores/RackStore';
import RackSynchronizer from '../../synchronizers/RackSynchronizer';

import Card from './shared/Card';
import withFlux from '../shared/withFlux';
import withSync from '../shared/withSync';

class Rack extends React.Component {

  static propTypes = {
    endGame: React.PropTypes.func.isRequired,
    user: React.PropTypes.object.isRequired,
    game: React.PropTypes.object.isRequired,
    rack: React.PropTypes.object.isRequired,
    drawTail: React.PropTypes.number,
    gameHelper: React.PropTypes.object.isRequired,
    rackHelper: React.PropTypes.object.isRequired
  };

  swap(item, key) {
    const { user, game, drawTail } = this.props;

    RackActions.swap(game.get('id'), user.get('id'), item, key, drawTail);
  }

  render() {
    const { endGame, rack, drawTail, gameHelper, rackHelper } = this.props;
    const { run } = rackHelper;

    return (
      <section className="rack">
        <header className="rack__header">
          <button
            disabled={!(gameHelper.isStarted && rackHelper.isRacko)}
            onClick={endGame}
            className="rack__game-end">
            Rack-O!
          </button>
        </header>

        <ol className="rack__items">
          {rack.reverse().map((value, key) => {
            let textValue = value;

            if (run && run.indexOf(value) !== -1) {
              textValue = <i>{value}</i>;
            }

            let onClick;

            if (drawTail) {
              onClick = this.swap.bind(this, value, key);
            }

            return (
              <li key={value} className="rack__item">
                <Card value={value} textValue={textValue} onClick={onClick} />
              </li>
            );
          })}
        </ol>
      </section>
    );
  }

}

function syncer() {
  const { gameId } = this.context.router.getCurrentParams();

  return [
    RackSynchronizer.get(gameId, this.props.user.get('id'))
  ];
}

function getter() {
  const { gameId } = this.context.router.getCurrentParams();

  const rack = RackStore.get(gameId, this.props.user.get('id'));

  return {
    rack,
    drawTail: DrawStore.getTail(gameId),
    rackHelper: new RackHelper(rack)
  };
}

const RackWithSync = withSync(Rack, syncer);
const RackWithFlux = withFlux(RackWithSync, getter, RackStore, DrawStore);

export default RackWithFlux;
