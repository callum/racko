import Immutable from 'immutable';
import storeMixin from '../storeMixin';
import AppDispatcher from '../dispatchers/AppDispatcher';
import AuthStore from './AuthStore';
import GameStore from './GameStore';

import { ActionTypes as GameActionTypes, States } from '../constants/GameConstants';
import { ActionTypes as RackActionTypes } from '../constants/RackConstants';
import { ActionTypes as UserActionTypes } from '../constants/UserConstants';

let users = Immutable.Map();

const UserStore = Object.assign({}, storeMixin, {

  get(userId) {
    return users.get(userId, Immutable.Map());
  },

  getGames(userId) {
    const games = UserStore.get(userId).get('games');

    if (games) {
      return games
        .filter(g => g.get('state') !== States.GAME_ENDED)
        .sortBy(g => new Date(g.get('updatedAt')))
        .reverse();
    }

    return Immutable.Map();
  }

});

function create(userId, details) {
  users = users.set(userId, Immutable.fromJS({
    id: userId,
    createdAt: Date.now(),
    ...details
  }));
}

function receive(user) {
  users = users.set(user.id, Immutable.fromJS(user));
}

function setGame(userId, gameId) {
  const game = GameStore.get(gameId);

  users = users.setIn([userId, 'games', gameId], Immutable.fromJS({
    id: game.get('id'),
    state: game.get('state'),
    updatedAt: game.get('updatedAt')
  }));
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
    case GameActionTypes.GAME_START:
    case GameActionTypes.GAME_END:
    case GameActionTypes.GAME_JOIN:
    case GameActionTypes.GAME_END_TURN:
    case RackActionTypes.RACK_SWAP:
      const userId = AuthStore.getUserId();

      if (userId) {
        AppDispatcher.waitFor([
          GameStore.dispatchToken
        ]);

        setGame(userId, action.gameId);

        UserStore.emitChange();
      }

      break;
  }
});

export default UserStore;
