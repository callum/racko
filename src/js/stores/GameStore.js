import Immutable from 'immutable';
import storeMixin from '../storeMixin';
import AppDispatcher from '../dispatchers/AppDispatcher';
import UserStore from './UserStore';
import GameUtils from '../utils/GameUtils';

import { ActionTypes as GameActionTypes, States } from '../constants/GameConstants';
import { ActionTypes as RackActionTypes } from '../constants/RackConstants';

let games = Immutable.Map();

const GameStore = Object.assign({}, storeMixin, {

  get(gameId) {
    return games.get(gameId, Immutable.Map());
  },

  getPlayers(gameId) {
    const players = GameStore.get(gameId).get('players');

    if (players) {
      return players.sortBy(g => new Date(g.get('joinedAt')));
    }

    return Immutable.Map();
  }

});

function create(gameId, userId) {
  const game = {
    id: gameId,
    state: States.GAME_CREATED,
    host: userId,
    createdAt: Date.now(),
    updatedAt: Date.now()
  };

  games = games.set(gameId, Immutable.fromJS(game));
}

function start(gameId) {
  const game = GameStore.get(gameId);

  games = games.mergeIn([gameId], {
    state: States.GAME_STARTED,
    turn: GameUtils.getNextTurn(game, game.get('host')),
    startedAt: Date.now(),
    updatedAt: Date.now()
  });
}

function end(gameId, winnerId) {
  games = games.mergeIn([gameId], {
    state: States.GAME_ENDED,
    turn: null,
    winner: winnerId,
    endedAt: Date.now(),
    updatedAt: Date.now()
  });
}

function join(gameId, userId) {
  const user = UserStore.get(userId);

  games = games.setIn([gameId, 'players', userId], Immutable.fromJS({
    id: user.get('id'),
    name: user.get('name'),
    joinedAt: Date.now()
  }));

  games = games.setIn([gameId, 'updatedAt'], Date.now());
}

function endTurn(gameId, userId) {
  const game = GameStore.get(gameId);

  games = games.mergeIn([gameId], {
    turn: GameUtils.getNextTurn(game, userId),
    updatedAt: Date.now()
  });
}

function receive(game) {
  games = games.set(game.id, Immutable.fromJS(game));
}

GameStore.dispatchToken = AppDispatcher.register(({ action }) => {
  switch (action.type) {
    case GameActionTypes.GAME_CREATE:
      create(action.gameId, action.userId);
      join(action.gameId, action.userId);

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

    case GameActionTypes.GAME_JOIN:
      join(action.gameId, action.userId);

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
