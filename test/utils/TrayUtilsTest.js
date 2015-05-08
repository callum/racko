import test from 'tape';
import { discard } from '../../src/js/utils/TrayUtils';

test('discard cycle', t => {
  t.plan(6);

  let tray = { draw: [1, 2, 3], discard: [4] };

  tray = discard(tray, 3);
  t.deepEqual(tray.draw, [1, 2]);
  t.deepEqual(tray.discard, [3, 4]);

  tray = discard(tray, 2);
  t.deepEqual(tray.draw, [1]);
  t.deepEqual(tray.discard, [2, 3, 4]);

  tray = discard(tray, 1);
  t.deepEqual(tray.draw, [2, 3, 4]);
  t.deepEqual(tray.discard, [1]);
});

test('discard from rack', t => {
  t.plan(6);

  let tray = { draw: [1, 2, 3], discard: [4] };

  tray = discard(tray, 15);
  t.deepEqual(tray.draw, [1, 2]);
  t.deepEqual(tray.discard, [15, 4]);

  tray = discard(tray, 25);
  t.deepEqual(tray.draw, [1]);
  t.deepEqual(tray.discard, [25, 15, 4]);

  tray = discard(tray, 35);
  t.deepEqual(tray.draw, [25, 15, 4]);
  t.deepEqual(tray.discard, [35]);
});
