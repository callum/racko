import Immutable from 'immutable';
import AppDispatcher from '../dispatchers/AppDispatcher';
import { ActionTypes, States } from '../constants/RackConstants';
import storeMixin from '../storeMixin';

let racks = Immutable.Map();

const RackStore = Object.assign({}, storeMixin, {

  get(gameId, userId) {
    return racks.getIn([gameId, userId]);
  }

});

function create(cards) {
  racks = racks.add(cards);
}

function receive(gameId, userId, rack) {
  racks = racks.setIn([gameId, userId], Immutable.OrderedSet(rack));
}

RackStore.dispatchToken = AppDispatcher.register(({ action }) => {
  switch (action.type) {
    case ActionTypes.RACK_CREATE:
      create(action.cards);

      RackStore.emitChange();
      break;

    case ActionTypes.RACK_RECEIVE:
      receive(action.gameId, action.userId, action.rack);

      RackStore.emitChange();
      break;
  }
});

export default RackStore;
