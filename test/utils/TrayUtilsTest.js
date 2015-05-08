import test from 'tape';
import { discard } from '../../src/js/utils/TrayUtils';

test('discard cycle', t => {
  t.plan(6);

  let tray = { draw: [1, 2, 3], discard: [4] };

  tray = discard(tray, 3);
  t.deepEqual(tray.draw, [1, 2]);
  t.deepEqual(tray.discard, [4, 3]);

  tray = discard(tray, 2);
  t.deepEqual(tray.draw, [1]);
  t.deepEqual(tray.discard, [4, 3, 2]);

  tray = discard(tray, 1);
  t.deepEqual(tray.draw, [4, 3, 2]);
  t.deepEqual(tray.discard, [1]);
});

test('discard from rack', t => {
  t.plan(6);

  let tray = { draw: [1, 2, 3], discard: [4] };

  tray = discard(tray, 15);
  t.deepEqual(tray.draw, [1, 2]);
  t.deepEqual(tray.discard, [4, 15]);

  tray = discard(tray, 25);
  t.deepEqual(tray.draw, [1]);
  t.deepEqual(tray.discard, [4, 15, 25]);

  tray = discard(tray, 35);
  t.deepEqual(tray.draw, [4, 15, 25]);
  t.deepEqual(tray.discard, [35]);
});
