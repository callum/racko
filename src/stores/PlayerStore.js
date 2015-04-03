import Immutable from 'immutable';
import AppDispatcher from '../dispatchers/AppDispatcher';
import { ActionTypes, States } from '../constants/PlayerConstants';
import storeMixin from '../storeMixin';

let players = Immutable.Map();

const PlayerStore = Object.assign({}, storeMixin, {

  get(gameId) {
    return players.get(gameId);
  }

});

function create(gameId, userId) {
  let user = UserStore.get(userId);

  players = players.setIn([gameId, userId], {
    id: user.id,
    name: user.name
  });
}

function receive(gameId, gamePlayers) {
  players = players.set(gameId, Immutable.fromJS(gamePlayers));
}

PlayerStore.dispatchToken = AppDispatcher.register(payload => {
  let { action } = payload;

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
