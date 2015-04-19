import Firebase from 'firebase';
import AppDispatcher from '../dispatchers/AppDispatcher';
import RackStore from '../stores/RackStore';
import { ActionTypes as GameActionTypes } from '../constants/GameConstants';

const FIREBASE = 'https://dazzling-heat-6913.firebaseio.com/';

function set(gameId) {
  const racks = RackStore.getAll(gameId);

  if (racks.size) {
    const ref = new Firebase(FIREBASE);

    ref.child('racks')
      .child(gameId)
      .set(racks.toJS());
  }
}

const RackPersister = {

  initialize() {
    this.dispatchToken = AppDispatcher.register(({ action }) => {
      AppDispatcher.waitFor([
        RackStore.dispatchToken
      ]);

      switch (action.type) {
        case GameActionTypes.GAME_START:
          window.setTimeout(() => set(action.gameId), 0);
          break;
      }
    });
  }

};

export default RackPersister;
