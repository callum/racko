import Immutable from 'immutable';
import AppDispatcher from '../dispatchers/AppDispatcher';
import { ActionTypes, States } from '../constants/GameConstants';
import storeMixin from '../storeMixin';

let games = Immutable.Map();

const GameStore = Object.assign({}, storeMixin, {

  get(id) {
    return games.get(id);
  }

});

function create(user, createId) {
  games = games.set(createId, {
    id: createId,
    state: States.CREATED,
    host: user.id
  });
}

function start(id) {
  games = games.update(id, {
    state: States.STARTED
  });
}

function receive(game) {
  games = games.set(game.id, Immutable.fromJS(game));
}

GameStore.dispatchToken = AppDispatcher.register(payload => {
  let { action } = payload;

  switch (action.type) {
    case ActionTypes.GAME_CREATE:
      create(action.user, action.createId);

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
