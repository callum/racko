import Immutable from 'immutable';
import AppDispatcher from '../dispatchers/AppDispatcher';
import UserStore from './UserStore';
import { ActionTypes } from '../constants/PlayerConstants';
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
  let user = UserStore.get(userId);

  players = players.setIn([gameId, userId], Immutable.fromJS({
    id: user.get('id'),
    name: user.get('name'),
    createdAt: new Date().toISOString()
  }));
}

function receive(gameId, gamePlayers) {
  players = players.set(gameId, Immutable.fromJS(gamePlayers));
}

PlayerStore.dispatchToken = AppDispatcher.register(({ action }) => {
  switch (action.type) {
    case ActionTypes.PLAYER_CREATE:
      create(action.gameId, action.userId);

      PlayerStore.emitChange();
      break;

    case ActionTypes.PLAYER_RECEIVE:
      receive(action.gameId, action.players);

      PlayerStore.emitChange();
      break;
  }
});

export default PlayerStore;
