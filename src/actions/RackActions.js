import AppDispatcher from '../dispatchers/AppDispatcher';
import { ActionTypes } from '../constants/RackConstants';

const RackActions = {

  swap(gameId, userId, item, location, replacement) {
    AppDispatcher.handleAction({
      type: ActionTypes.RACK_SWAP,
      gameId,
      userId,
      item,
      replacement,
      location
    });
  },

  receive(gameId, userId, rack) {
    AppDispatcher.handleAction({
      type: ActionTypes.RACK_RECEIVE,
      gameId,
      userId,
      rack
    });
  }

};

export default RackActions;
