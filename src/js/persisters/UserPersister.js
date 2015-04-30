import AppDispatcher from '../dispatchers/AppDispatcher';
import UserStore from '../stores/UserStore';
import UserService from '../services/UserService';

import { ActionTypes as UserActionTypes } from '../constants/UserConstants';
import { ActionTypes as GameActionTypes } from '../constants/GameConstants';

function set(userId) {
  const user = UserStore.get(userId);

  if (user) {
    UserService.set(user);
  }
}

const UserPersister = {

  initialize() {
    this.dispatchToken = AppDispatcher.register(({ action }) => {
      AppDispatcher.waitFor([
        UserStore.dispatchToken
      ]);

      switch (action.type) {
        case UserActionTypes.USER_CREATE:
        case GameActionTypes.GAME_CREATE:
          window.setTimeout(() => set(action.userId), 0);
          break;
      }
    });
  }

};

export default UserPersister;
