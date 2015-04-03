import AppDispatcher from '../dispatchers/AppDispatcher';
import { ActionTypes } from '../constants/PlayerConstants';

const PlayerActions = {

  create(gameId, userId) {
    AppDispatcher.handleAction({
      type: ActionTypes.PLAYER_CREATE,
      gameId,
      userId
    });
  },

  receive(gameId, players) {
    AppDispatcher.handleAction({
      type: ActionTypes.PLAYER_RECEIVE,
      gameId,
      players
    });
  }

};

export default PlayerActions;
