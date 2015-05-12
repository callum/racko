import AppDispatcher from '../dispatchers/AppDispatcher';
import TrayService from '../services/TrayService';
import { ActionTypes } from '../constants/RackConstants';

const DrawPersister = {

  initialize() {
    AppDispatcher.register(({ action }) => {
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
