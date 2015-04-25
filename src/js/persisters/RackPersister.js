import Firebase from 'firebase';
import AppDispatcher from '../dispatchers/AppDispatcher';
import RackStore from '../stores/RackStore';
import { ActionTypes } from '../constants/RackConstants';

function set(gameId, userId) {
  const rack = RackStore.get(gameId, userId);

  if (rack.size) {
    const ref = new Firebase(FIREBASE);

    ref.child('racks')
      .child(gameId)
      .child(userId)
      .set(rack.toJS());
  }
}

const RackPersister = {

  initialize() {
    this.dispatchToken = AppDispatcher.register(({ action }) => {
      AppDispatcher.waitFor([
        RackStore.dispatchToken
      ]);

      switch (action.type) {
        case ActionTypes.RACK_SWAP:
          window.setTimeout(() => set(action.gameId, action.userId), 0);
          break;
      }
    });
  }

};

export default RackPersister;
