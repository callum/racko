import Immutable from 'immutable';
import AppDispatcher from '../dispatchers/AppDispatcher';
import { ActionTypes as GameActionTypes } from '../constants/GameConstants';
import { ActionTypes as RackActionTypes } from '../constants/RackConstants';
import storeMixin from '../storeMixin';

let racks = Immutable.Map();

const RackStore = Object.assign({}, storeMixin, {

  get(gameId, userId) {
    return racks.getIn([gameId, userId], Immutable.OrderedSet());
  }

});

function create(gameId, userId, rack) {
  racks = racks.setIn([gameId, userId], Immutable.OrderedSet(rack));
}

function receive(gameId, userId, rack) {
  racks = racks.setIn([gameId, userId], Immutable.OrderedSet(rack));
}

RackStore.dispatchToken = AppDispatcher.register(({ action }) => {
  switch (action.type) {
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
