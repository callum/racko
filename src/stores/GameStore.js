import Immutable from 'immutable';
import AppDispatcher from '../dispatchers/AppDispatcher';
import { ActionTypes as GameActionTypes, States } from '../constants/GameConstants';
import { ActionTypes as RackActionTypes } from '../constants/RackConstants';
import GameUtils from '../utils/GameUtils';
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
  const game = GameStore.get(gameId);

  games = games.mergeIn([gameId], {
    state: States.STARTED,
    turn: GameUtils.getNextTurn(game, game.get('host'))
  });
}

function end(gameId, winnerId) {
  games = games.mergeIn([gameId], {
    state: States.ENDED,
    winner: winnerId
  });
}

function endTurn(gameId, userId) {
  const game = GameStore.get(gameId);

  games = games.mergeIn([gameId], {
    turn: GameUtils.getNextTurn(game, userId)
  });
}

function receive(game) {
  games = games.set(game.id, Immutable.fromJS(game));
}

GameStore.dispatchToken = AppDispatcher.register(({ action }) => {
  switch (action.type) {
    case GameActionTypes.GAME_CREATE:
      create(action.gameId, action.userId);

      GameStore.emitChange();
      break;

    case GameActionTypes.GAME_START:
      start(action.gameId);

      GameStore.emitChange();
      break;

    case GameActionTypes.GAME_END:
      end(action.gameId, action.winnerId);

      GameStore.emitChange();
      break;

    case GameActionTypes.GAME_END_TURN:
    case RackActionTypes.RACK_SWAP:
      endTurn(action.gameId, action.userId);

      GameStore.emitChange();
      break;

    case GameActionTypes.GAME_RECEIVE:
      receive(action.game);

      GameStore.emitChange();
      break;
  }
});

export default GameStore;
