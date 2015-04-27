import test from 'tape';
import Immutable from 'immutable';
import RackHelper from '../../src/js/helpers/RackHelper';

function getHelper(rack) {
  return new RackHelper(Immutable.OrderedSet(rack));
}

test('gets streak', t => {
  t.plan(3);

  const rackA = getHelper([10, 12, 13, 4, 5, 23, 41, 34, 24, 10]);
  const rackB = getHelper([3, 7, 8, 9, 15, 6, 7, 8, 9, 10]);
  const rackC = getHelper([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

  t.equal(rackA.streak, 3);
  t.equal(rackB.streak, 5);
  t.equal(rackC.streak, 10);
});

test('detects racko', t => {
  t.plan(3);

  const rackA = getHelper([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const rackB = getHelper([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const rackC = getHelper([1, 2, 3, 4, 5, 6, 7, 8, 40, 35]);

  t.ok(rackA.isRacko);
  t.ok(rackB.isRacko);

  t.notOk(rackC.isRacko);
});
