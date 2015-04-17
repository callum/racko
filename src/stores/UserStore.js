import Immutable from 'immutable';
import AppDispatcher from '../dispatchers/AppDispatcher';
import storeMixin from '../storeMixin';

import { ActionTypes as UserActionTypes } from '../constants/UserConstants';
import { ActionTypes as GameActionTypes } from '../constants/GameConstants';

let users = Immutable.Map();

const UserStore = Object.assign({}, storeMixin, {

  get(userId) {
    return users.get(userId, Immutable.Map());
  }

});

function create(userId, details) {
  const user = Object.assign({
    id: userId,
    createdAt: new Date().toISOString()
  }, details);

  users = users.set(userId, Immutable.fromJS(user));
}

function receive(user) {
  users = users.set(user.id, Immutable.fromJS(user));
}

function addGame(userId, gameId) {
  users = users.setIn([userId, 'games', gameId], true);
}

UserStore.dispatchToken = AppDispatcher.register(({ action }) => {
  switch (action.type) {
    case UserActionTypes.USER_CREATE:
      create(action.userId, action.details);

      UserStore.emitChange();
      break;

    case UserActionTypes.USER_RECEIVE:
      receive(action.user);

      UserStore.emitChange();
      break;

    case GameActionTypes.GAME_CREATE:
      addGame(action.userId, action.gameId);

      UserStore.emitChange();
      break;
  }
});

export default UserStore;
