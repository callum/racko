import React from 'react';
import Players from './game/Players';
import Rack from './game/Rack';
import Tray from './game/Tray';
import Turn from './game/Turn';
import withFirebase from './shared/withFirebase';
import next from 'array-next';
import { range } from 'range';
import { shuffle } from 'deck';

export class Game extends React.Component {

  static getDefaultData() {
    return {
      game: null,
      players: null
    };
  }

  static addDataHandlers() {
    let { key } = this.context.router.getCurrentParams();

    this.game = this.firebase.child('games').child(key);
    this.players = this.firebase.child('players').child(key);

    this.handlers.game = this.game.on('value', res => {
      if (res.exists()) {
        this.setState({
          game: res.val()
        });
      }
    });

    this.handlers.players = this.players.on('value', res => {
      if (res.exists()) {
        this.setState({
          players: res.val()
        });
      }
    });
  }

  static removeDataHandlers() {
    this.game.off('value', this.handlers.game);
    this.players.off('value', this.handlers.players);
  }

  constructor() {
    this.state = {
      takeTurn: false
    };
  }

  getGameKey() {
    return this.context.router.getCurrentParams().key;
  }

  getUserKey() {
    return this.props.firebase.getAuth().uid;
  }

  toggleTurn(toggle) {
    this.setState({
      turn: toggle
    });
  }

  isCommenced() {
    return this.props.game.state === 'commenced';
  }

  isTurn() {
    return this.props.game.turn === this.getUserKey();
  }

  isHost() {
    return this.props.game.host === this.getUserKey();
  }

  isParticipant() {
    return this.props.players.hasOwnProperty(this.getUserKey());
  }

  render() {
    let gameKey = this.getGameKey();

    if (this.props.game && this.props.players) {
      return (
        <div>
          <Players gameKey={gameKey} {...this.props} />

          {this.isCommenced() ? (
            <div>
              <Tray gameKey={gameKey} {...this.props} />
              <Rack gameKey={gameKey} {...this.props} />

              {this.isTurn() &&
                <div>
                  {this.state.turn ? (
                    <Turn
                      gameKey={gameKey}
                      onFinish={this.next.bind(this)}
                      {...this.props}
                    />
                  ) : (
                    <button onClick={this.toggleTurn.bind(this, true)}>
                      Take turn
                    </button>
                  )}
                </div>
              }
            </div>
          ) : (
            <div>
              {this.isHost() &&
                <button onClick={this.start.bind(this)}>
                  Start
                </button>
              }

              {!this.isParticipant() &&
                <button onClick={this.join.bind(this)}>
                  Join
                </button>
              }
            </div>
          )}
        </div>
      );
    }

    return (
      <p>Loading game…</p>
    );
  }

  start() {
    let gameKey = this.getGameKey();
    let userKey = this.getUserKey();
    let players = Object.keys(this.props.players);
    let deckSize;

    switch (players.length) {
      case 2:
        deckSize = 40;
        break;
      case 3:
        deckSize = 50;
        break;
      case 4:
        deckSize = 60;
        break;
      default:
        throw new Error('Wrong number of players');
    }

    let deck = shuffle(range(1, deckSize + 1));

    let racks = players.reduce((prev, key) => {
      return Object.assign({
        [key]: deck.splice(0, 10)
      }, prev);
    }, {});

    let draw = deck;
    let discard = [draw.pop()];

    this.props.firebase.child('trays').child(gameKey).set({
      draw,
      discard
    });

    this.props.firebase.child('racks').child(gameKey).set(racks);

    this.props.firebase.child('games').child(gameKey).update({
      state: 'commenced',
      turn: next(players, userKey)
    });
  }

  join() {
    let gameKey = this.getGameKey();
    let userKey = this.getUserKey();

    this.props.firebase.child('users').child(userKey).child('games').child(gameKey).set(true);

    this.props.firebase.child('players').child(gameKey).child(userKey).set({
      name: this.props.user.name
    });
  }

  next() {
    let gameKey = this.getGameKey();
    let players = Object.keys(this.props.players);

    this.props.firebase.child('games').child(gameKey).update({
      turn: next(players, this.props.game.turn)
    });

    this.toggleTurn(false);
  }

}

Game.contextTypes = {
  router: React.PropTypes.func.isRequired
};

export default withFirebase(Game);
