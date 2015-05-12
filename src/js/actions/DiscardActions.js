import AppDispatcher from '../dispatchers/AppDispatcher';
import { ActionTypes } from '../constants/DiscardConstants';

const DiscardActions = {

  receiveHead(gameId, discard) {
    AppDispatcher.handleAction({
      type: ActionTypes.DISCARD_RECEIVE_HEAD,
      gameId,
      discard
    });
  }

};

export default DiscardActions;
