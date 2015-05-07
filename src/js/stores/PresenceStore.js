import Immutable from 'immutable';
import storeMixin from '../storeMixin';
import AppDispatcher from '../dispatchers/AppDispatcher';
import { ActionTypes } from '../constants/PresenceConstants';

let presences = Immutable.Map();

const PresenceStore = Object.assign({}, storeMixin, {

  get(userId) {
    return presences.get(userId, Immutable.Map());
  },

  isConnected(userId) {
    return !!PresenceStore.get(userId).get('connections');
  }

});

function receive(presence) {
  presences = presences.set(presence.id, Immutable.fromJS(presence));
}

PresenceStore.dispatchToken = AppDispatcher.register(({ action }) => {
  switch (action.type) {
    case ActionTypes.PRESENCE_RECEIVE:
      receive(action.presence);

      PresenceStore.emitChange();
      break;
  }
});

export default PresenceStore;
