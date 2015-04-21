import AppDispatcher from '../dispatchers/AppDispatcher';
import { ActionTypes } from '../constants/GameConstants';
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

  start(gameId, setup) {
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
