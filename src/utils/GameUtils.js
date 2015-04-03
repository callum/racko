import next from 'array-next';
import { range } from 'range';
import { shuffle } from 'deck';

function start() {
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

function join() {
  this.props.firebase.child('users').child(userKey).child('games').child(gameKey).set(true);

  this.props.firebase.child('players').child(gameKey).child(userKey).set({
    name: this.props.user.name
  });
}

function rotateTurn() {
  let players = Object.keys(this.props.players);

  this.props.firebase.child('games').child(gameKey).update({
    turn: next(players, this.props.game.turn)
  });

  this.toggleTurn(false);
}

function create() {
  this.props.firebase.child('users').child(uid).child('games').child(key).set(true);

  this.props.firebase.child('players').child(key).child(uid).set({
    name: this.props.user.name
  });
}
