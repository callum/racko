import AppDispatcher from '../dispatchers/AppDispatcher';
import { ActionTypes } from '../constants/GameConstants';
import GameUtils from '../utils/GameUtils';
import uid from 'uid';

const GameActions = {

  create(userId) {
    const gameId = uid();

    AppDispatcher.handleAction({
      type: ActionTypes.GAME_CREATE,
      gameId,
      userId
    });
  },

  start(gameId) {
    const setup = GameUtils.setup(gameId);

    AppDispatcher.handleAction({
      type: ActionTypes.GAME_START,
      gameId,
      setup
    });
  },

  end(gameId, winnerId) {
    AppDispatcher.handleAction({
      type: ActionTypes.GAME_END,
      gameId,
      winnerId
    });
  },

  join(gameId, userId) {
    AppDispatcher.handleAction({
      type: ActionTypes.GAME_JOIN,
      gameId,
      userId
    });
  },

  endTurn(gameId, userId) {
    AppDispatcher.handleAction({
      type: ActionTypes.GAME_END_TURN,
      gameId,
      userId
    });
  },

  receive(game) {
    AppDispatcher.handleAction({
      type: ActionTypes.GAME_RECEIVE,
      game
    });
  }

};

export default GameActions;
