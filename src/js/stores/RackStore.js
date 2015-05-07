import Immutable from 'immutable';
import storeMixin from '../storeMixin';
import AppDispatcher from '../dispatchers/AppDispatcher';

import { ActionTypes as GameActionTypes } from '../constants/GameConstants';
import { ActionTypes as RackActionTypes } from '../constants/RackConstants';

let racks = Immutable.Map();

const RackStore = Object.assign({}, storeMixin, {

  get(gameId, userId) {
    return racks.getIn([gameId, userId], Immutable.OrderedMap());
  }

});

function create(gameId, userId, rack) {
  racks = racks.setIn([gameId, userId], Immutable.OrderedMap(rack));
}

function swap(gameId, userId, location, replacement) {
  racks = racks.setIn([gameId, userId, location], replacement);
}

function receive(gameId, userId, rack) {
  racks = racks.setIn([gameId, userId], Immutable.OrderedMap(rack));
}

RackStore.dispatchToken = AppDispatcher.register(({ action }) => {
  switch (action.type) {
    case RackActionTypes.RACK_SWAP:
      swap(action.gameId, action.userId, action.location, action.replacement);

      RackStore.emitChange();
      break;

    case RackActionTypes.RACK_RECEIVE:
      receive(action.gameId, action.userId, action.rack);

      RackStore.emitChange();
      break;

    case GameActionTypes.GAME_START:
      create(action.gameId, action.userId, action.setup.rack);

      RackStore.emitChange();
      break;
  }
});

export default RackStore;
