import AppDispatcher from '../dispatchers/AppDispatcher';
import { ActionTypes } from '../constants/DiscardConstants';

const DiscardActions = {

  receive(gameId, discard) {
    AppDispatcher.handleAction({
      type: ActionTypes.DISCARD_RECEIVE,
      gameId,
      discard
    });
  }

};

export default DiscardActions;
