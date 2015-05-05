import AppDispatcher from '../dispatchers/AppDispatcher';
import { ActionTypes } from '../constants/PresenceConstants';

const PresenceActions = {

  receive(presence) {
    AppDispatcher.handleAction({
      type: ActionTypes.PRESENCE_RECEIVE,
      presence
    });
  }

};

export default PresenceActions;
