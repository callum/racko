import Immutable from 'immutable';
import AppDispatcher from '../dispatchers/AppDispatcher';
import { ActionTypes, States } from '../constants/GameConstants';
import storeMixin from '../storeMixin';

let games = Immutable.Map();

const GameStore = Object.assign({}, storeMixin, {

  get(id) {
    return games.get(id, Immutable.Map());
  }

});

function create(id, userId) {
  const game = {
    id,
    state: States.CREATED,
    host: userId,
    createdAt: new Date().toISOString()
  };

  games = games.set(id, Immutable.fromJS(game));
}

function start(id) {
  games = games.update(id, {
    state: States.STARTED
  });
}

function receive(game) {
  games = games.set(game.id, Immutable.fromJS(game));
}

GameStore.dispatchToken = AppDispatcher.register(({ action }) => {
  switch (action.type) {
    case ActionTypes.GAME_CREATE:
      create(action.id, action.userId);

      GameStore.emitChange();
      break;

    case ActionTypes.GAME_START:
      start(action.user);

      GameStore.emitChange();
      break;

    case ActionTypes.GAME_RECEIVE:
      receive(action.game);

      GameStore.emitChange();
      break;
  }
});

export default GameStore;
