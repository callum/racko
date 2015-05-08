import test from 'tape';
import Immutable from 'immutable';
import GameUtils from '../../src/js/utils/GameUtils';

test('list players', t => {
  t.plan(2);

  const gameA = Immutable.fromJS({
    players: {
      a: { name: 'David' }
    }
  });

  const gameB = Immutable.fromJS({
    players: {
      a: { name: 'David' },
      b: { name: 'Ed' },
      c: { name: 'Nick' },
      d: { name: 'Nigel' }
    }
  });

  t.equal(GameUtils.getPlayerList(gameA), 'David');
  t.equal(GameUtils.getPlayerList(gameB), 'David, Ed, Nick and Nigel');
});

test('create deck', t => {
  t.plan(3);

  t.equal(GameUtils.createDeck(2).length, 40);
  t.equal(GameUtils.createDeck(3).length, 50);
  t.equal(GameUtils.createDeck(4).length, 60);
});

test('create racks', t => {
  t.plan(4);

  const players = Immutable.fromJS({
    a: { id: 'a' },
    b: { id: 'b' },
    c: { id: 'c' },
    d: { id: 'd' }
  });

  const deck = GameUtils.createDeck(players.size);
  const racks = GameUtils.createRacks(players, deck);

  t.equal(racks.a.length, 10);
  t.equal(racks.b.length, 10);
  t.equal(racks.c.length, 10);
  t.equal(racks.d.length, 10);
});
