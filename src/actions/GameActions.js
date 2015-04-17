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

  start(gameId) {
    AppDispatcher.handleAction({
      type: ActionTypes.GAME_START,
      gameId
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
