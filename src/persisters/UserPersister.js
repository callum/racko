import Firebase from 'firebase';
import AppDispatcher from '../dispatchers/AppDispatcher';
import UserStore from '../stores/UserStore';
import { ActionTypes } from '../constants/UserConstants';

const FIREBASE = 'https://dazzling-heat-6913.firebaseio.com/';

function create(id) {
  const user = UserStore.get(id);

  if (user.size) {
    const ref = new Firebase(FIREBASE);

    ref.child('users')
     .child(id)
     .set(user.toJS());
  }
}

const UserPersister = {

  initialize() {
    this.dispatchToken = AppDispatcher.register(({ action }) => {
      AppDispatcher.waitFor([
        UserStore.dispatchToken
      ]);

      switch (action.type) {
        case ActionTypes.USER_CREATE:
          window.setTimeout(() => create(action.id), 0);

          break;
      }
    });
  }

};

export default UserPersister;
