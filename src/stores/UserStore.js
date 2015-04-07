import Immutable from 'immutable';
import AppDispatcher from '../dispatchers/AppDispatcher';
import { ActionTypes } from '../constants/UserConstants';
import storeMixin from '../storeMixin';

let users = Immutable.Map();

const UserStore = Object.assign({}, storeMixin, {

  get(id) {
    return users.get(id);
  }

});

function create(user, createId) {
  users = users.set(createId, {
    id: createId,
    name: user.name
  });
}

function receive(user) {
  users = users.set(user.id, Immutable.Map(user));
}

UserStore.dispatchToken = AppDispatcher.register(({ action }) => {
  switch (action.type) {
    case ActionTypes.USER_CREATE:
      create(action.user, action.createId);

      UserStore.emitChange();
      break;

    case ActionTypes.USER_RECEIVE:
      receive(action.user);

      UserStore.emitChange();
      break;
  }
});

export default UserStore;
