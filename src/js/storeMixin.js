import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

const storeMixin = Object.assign({

  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

}, EventEmitter.prototype);

storeMixin.setMaxListeners(0);

export default storeMixin;
