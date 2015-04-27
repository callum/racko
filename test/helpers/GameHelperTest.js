import test from 'tape';
import Immutable from 'immutable';
import GameHelper from '../../src/js/helpers/GameHelper';
import { States } from '../../src/js/constants/GameConstants';

function getUser(id) {
  return Immutable.fromJS({ id });
}

function getHelper(state) {
  const game = Immutable.fromJS({
    state,
    host: 'foo',
    turn: 'bar',
    winner: 'baz',
    players: {
      foo: { name: 'Foo' },
      bar: { name: 'Bar' },
      baz: { name: 'Baz' }
    }
  });

  return new GameHelper(game);
}

test('is joined', t => {
  t.plan(2);

  const gameHelper = getHelper();

  t.ok(gameHelper.isJoined(getUser('foo')));
  t.notOk(gameHelper.isJoined(getUser('fizz')));
});

test('is turn', t => {
  t.plan(2);

  const gameHelper = getHelper();

  t.ok(gameHelper.isTurn(getUser('bar')));
  t.notOk(gameHelper.isTurn(getUser('fizz')));
});

test('is winner', t => {
  t.plan(2);

  const gameHelper = getHelper();

  t.ok(gameHelper.isWinner(getUser('baz')));
  t.notOk(gameHelper.isWinner(getUser('fizz')));
});

test('winner name', t => {
  t.plan(1);

  const gameHelper = getHelper();

  t.equal(gameHelper.winnerName, 'Baz');
});

test('can join', t => {
  t.plan(1);

  const gameHelper = getHelper();

  t.ok(gameHelper.canJoin);
});

test('can start', t => {
  t.plan(1);

  const gameHelper = getHelper();

  t.ok(gameHelper.canStart);
});

test('is created', t => {
  t.plan(1);

  const gameHelper = getHelper(States.GAME_CREATED);

  t.ok(gameHelper.isCreated);
});

test('is started', t => {
  t.plan(1);

  const gameHelper = getHelper(States.GAME_STARTED);

  t.ok(gameHelper.isStarted);
});

test('is ended', t => {
  t.plan(1);

  const gameHelper = getHelper(States.GAME_ENDED);

  t.ok(gameHelper.isEnded);
});
