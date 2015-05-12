import Immutable from 'immutable';
import storeMixin from '../storeMixin';
import AppDispatcher from '../dispatchers/AppDispatcher';

import { ActionTypes as DiscardActionTypes } from '../constants/DiscardConstants';
import { ActionTypes as GameActionTypes } from '../constants/GameConstants';

let discards = Immutable.Map();

const DiscardStore = Object.assign({}, storeMixin, {

  getHead(gameId) {
    return discards.get(gameId);
  }

});

function create(gameId, discard) {
  discards = discards.set(gameId, discard);
}

function receiveHead(gameId, discard) {
  discards = discards.set(gameId, discard);
}

DiscardStore.dispatchToken = AppDispatcher.register(({ action }) => {
  switch (action.type) {
    case DiscardActionTypes.DISCARD_RECEIVE_HEAD:
      receiveHead(action.gameId, action.discard);

      DiscardStore.emitChange();
      break;

    case GameActionTypes.GAME_START:
      create(action.gameId, action.setup.discard);

      DiscardStore.emitChange();
      break;
  }
});

export default DiscardStore;
