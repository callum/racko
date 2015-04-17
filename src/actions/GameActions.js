import AppDispatcher from '../dispatchers/AppDispatcher';
import { ActionTypes } from '../constants/GameConstants';
import uid from 'uid';

const GameActions = {

  create(userId) {
    const id = uid();

    AppDispatcher.handleAction({
      type: ActionTypes.GAME_CREATE,
      id,
      userId
    });
  },

  start(id) {
    AppDispatcher.handleAction({
      type: ActionTypes.GAME_START,
      id
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
