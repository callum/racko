import test from 'tape';
import Immutable from 'immutable';
import ScoreHelper from '../../src/js/helpers/ScoreHelper';

function getHelper(rack, didRacko = false) {
  return new ScoreHelper(Immutable.OrderedSet(rack), didRacko);
}

test('gets points', t => {
  t.plan(3);

  const rackA = getHelper([5, 2, 3, 17, 18, 31, 35, 22, 49, 7]);
  const rackB = getHelper([10, 12, 19, 22, 23, 26, 31, 33, 39, 40]);
  const rackC = getHelper([10, 12, 19, 22, 23, 26, 31, 33, 39, 40], true);

  t.equal(rackA.points, 5);
  t.equal(rackB.points, 50);
  t.equal(rackC.points, 75);
});

test('gets bonus', t => {
  t.plan(3);

  const rackA = getHelper([6, 7, 8, 12, 21, 34, 35, 36, 37, 40]);
  const rackB = getHelper([6, 7, 8, 12, 21, 34, 35, 36, 37, 40], true);
  const rackC = getHelper([10, 12, 13, 14, 15, 16, 17, 34, 37, 38], true);

  t.equal(rackA.bonus, 0);
  t.equal(rackB.bonus, 100);
  t.equal(rackC.bonus, 400);
});

test('gets total', t => {
  t.plan(3);

  const rackA = getHelper([5, 9, 3, 17, 18, 24, 25, 26, 27, 7]);
  const rackB = getHelper([6, 7, 8, 12, 21, 34, 35, 36, 37, 40], true);
  const rackC = getHelper([10, 12, 13, 14, 15, 16, 17, 34, 37, 38], true);

  t.equal(rackA.total, 10 + 0);
  t.equal(rackB.total, 75 + 100);
  t.equal(rackC.total, 75 + 400);
});
