import AppDispatcher from '../dispatchers/AppDispatcher';
import RackService from '../services/RackService';
import RackStore from '../stores/RackStore';
import { ActionTypes } from '../constants/RackConstants';

function set(gameId, userId) {
  const rack = RackStore.get(gameId, userId);

  if (rack) {
    RackService.set(gameId, userId, rack);
  }
}

const RackPersister = {

  initialize() {
    AppDispatcher.register(({ action }) => {
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
