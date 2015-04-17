import Immutable from 'immutable';
import AppDispatcher from '../dispatchers/AppDispatcher';
import { ActionTypes } from '../constants/UserConstants';
import storeMixin from '../storeMixin';

let users = Immutable.Map();

const UserStore = Object.assign({}, storeMixin, {

  get(id) {
    return users.get(id, Immutable.Map());
  }

});

function create(id, data) {
  const user = Object.assign({
    id,
    createdAt: new Date().toISOString()
  }, data);

  users = users.set(id, Immutable.fromJS(user));
}

function receive(user) {
  users = users.set(user.id, Immutable.fromJS(user));
}

UserStore.dispatchToken = AppDispatcher.register(({ action }) => {
  switch (action.type) {
    case ActionTypes.USER_CREATE:
      create(action.id, action.data);

      UserStore.emitChange();
      break;

    case ActionTypes.USER_RECEIVE:
      receive(action.user);

      UserStore.emitChange();
      break;
  }
});

export default UserStore;
