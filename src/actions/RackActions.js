import AppDispatcher from '../dispatchers/AppDispatcher';
import { ActionTypes } from '../constants/RackConstants';

const RackActions = {

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
