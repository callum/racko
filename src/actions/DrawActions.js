import AppDispatcher from '../dispatchers/AppDispatcher';
import { ActionTypes } from '../constants/DrawConstants';

const DrawActions = {

  resetTail(gameId) {
    AppDispatcher.handleAction({
      type: ActionTypes.DRAW_RESET_TAIL,
      gameId
    });
  },

  receiveTail(gameId, drawTail) {
    AppDispatcher.handleAction({
      type: ActionTypes.DRAW_RECEIVE_TAIL,
      gameId,
      drawTail
    });
  }

};

export default DrawActions;
