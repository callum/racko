import test from 'tape';
import AuthStore from '../../src/js/stores/AuthStore';
import AuthActions from '../../src/js/actions/AuthActions';

function setupStore(callback) {
  AuthStore.addChangeListener(callback);

  return () => AuthStore.removeChangeListener(callback);
}

test('receive', t => {
  t.plan(2);

  const off = setupStore(() => {
    t.equal(AuthStore.getToken(), 'foo');
    t.equal(AuthStore.getUserId(), 'bar');
  });

  AuthActions.receive({
    token: 'foo',
    uid: 'bar'
  });

  off();
});

test('reconcile token', t => {
  t.plan(1);

  const off = setupStore(() => {
    t.equal(AuthStore.getToken(), 'baz');
  });

  AuthActions.reconcileToken('baz');

  off();
});
