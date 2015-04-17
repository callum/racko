import AppDispatcher from '../dispatchers/AppDispatcher';
import { ActionTypes } from '../constants/UserConstants';

const UserActions = {

  create(id, data) {
    AppDispatcher.handleAction({
      type: ActionTypes.USER_CREATE,
      id,
      data
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
