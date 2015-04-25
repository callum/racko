import Immutable from 'immutable';
import AppDispatcher from '../dispatchers/AppDispatcher';
import UserStore from './UserStore';
import { ActionTypes as GameActionTypes } from '../constants/GameConstants';
import { ActionTypes as PlayerActionTypes } from '../constants/PlayerConstants';
import storeMixin from '../storeMixin';

let players = Immutable.Map();

const PlayerStore = Object.assign({}, storeMixin, {

  get(gameId, userId) {
    return players.getIn([gameId, userId], Immutable.Map());
  },

  getAll(gameId) {
    return players.get(gameId, Immutable.Map());
  }

});

function create(gameId, userId) {
  const user = UserStore.get(userId);

  if (user.size) {
    players = players.setIn([gameId, userId], Immutable.fromJS({
      id: userId,
      name: user.get('name'),
      createdAt: new Date().toISOString()
    }));
  }
}

function receiveAll(gameId, allPlayers) {
  players = players.set(gameId, Immutable.fromJS(allPlayers));
}

PlayerStore.dispatchToken = AppDispatcher.register(({ action }) => {

  switch (action.type) {
    case PlayerActionTypes.PLAYER_CREATE:
    case GameActionTypes.GAME_CREATE:
      AppDispatcher.waitFor([
        UserStore.dispatchToken
      ]);

      create(action.gameId, action.userId);

      PlayerStore.emitChange();
      break;

    case PlayerActionTypes.PLAYER_RECEIVE_ALL:
      receiveAll(action.gameId, action.players);

      PlayerStore.emitChange();
      break;
  }
});

export default PlayerStore;
