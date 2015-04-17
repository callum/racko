import Immutable from 'immutable';
import AppDispatcher from '../dispatchers/AppDispatcher';
import { ActionTypes, States } from '../constants/GameConstants';
import storeMixin from '../storeMixin';

let games = Immutable.Map();

const GameStore = Object.assign({}, storeMixin, {

  get(gameId) {
    return games.get(gameId, Immutable.Map());
  }

});

function create(gameId, userId) {
  const game = {
    id: gameId,
    state: States.CREATED,
    host: userId,
    createdAt: new Date().toISOString()
  };

  games = games.set(gameId, Immutable.fromJS(game));
}

function start(gameId) {
  games = games.update(gameId, {
    state: States.STARTED
  });
}

function receive(game) {
  games = games.set(game.id, Immutable.fromJS(game));
}

GameStore.dispatchToken = AppDispatcher.register(({ action }) => {
  switch (action.type) {
    case ActionTypes.GAME_CREATE:
      create(action.gameId, action.userId);

      GameStore.emitChange();
      break;

    case ActionTypes.GAME_START:
      start(action.gameId);

      GameStore.emitChange();
      break;

    case ActionTypes.GAME_RECEIVE:
      receive(action.game);

      GameStore.emitChange();
      break;
  }
});

export default GameStore;
