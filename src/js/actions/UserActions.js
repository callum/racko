import AppDispatcher from '../dispatchers/AppDispatcher';
import { ActionTypes } from '../constants/UserConstants';

const UserActions = {

  create(userId, details) {
    AppDispatcher.handleAction({
      type: ActionTypes.USER_CREATE,
      userId,
      details
    });
  },

  receive(user) {
    AppDispatcher.handleAction({
      type: ActionTypes.USER_RECEIVE,
      user
    });
  }

};

export default UserActions;
