import AppDispatcher from '../dispatchers/AppDispatcher';
import { ActionTypes } from '../constants/RackConstants';
import TrayService from '../services/TrayService';

const DrawPersister = {

  initialize() {
    this.dispatchToken = AppDispatcher.register(({ action }) => {
      switch (action.type) {
        case ActionTypes.RACK_SWAP:
          window.setTimeout(() => {
            TrayService.discard(action.gameId, action.item);
          }, 0);

          break;
      }
    });
  }

};

export default DrawPersister;
