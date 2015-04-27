import Immutable from 'immutable';
import AppDispatcher from '../dispatchers/AppDispatcher';
import { ActionTypes as GameActionTypes } from '../constants/GameConstants';
import { ActionTypes as DrawActionTypes } from '../constants/DrawConstants';
import { ActionTypes as RackActionTypes } from '../constants/RackConstants';
import storeMixin from '../storeMixin';

let draws = Immutable.Map();

const DrawStore = Object.assign({}, storeMixin, {

  getTail(gameId) {
    return parseInt(draws.get(gameId), 10);
  }

});

function resetTail(gameId) {
  draws = draws.set(gameId, null);
}

function receiveTail(gameId, drawTail) {
  draws = draws.set(gameId, drawTail);
}

DrawStore.dispatchToken = AppDispatcher.register(({ action }) => {
  switch (action.type) {
    case DrawActionTypes.DRAW_RECEIVE_TAIL:
      receiveTail(action.gameId, action.drawTail);

      DrawStore.emitChange();
      break;

    case GameActionTypes.GAME_END:
    case GameActionTypes.GAME_END_TURN:
    case RackActionTypes.RACK_SWAP:
      resetTail(action.gameId);

      DrawStore.emitChange();
      break;
  }
});

export default DrawStore;
