import AppDispatcher from '../dispatchers/AppDispatcher';
import { ActionTypes } from '../constants/GameConstants';
import uid from 'uid';

const GameActions = {

  create(user) {
    let createId = uid();

    AppDispatcher.handleAction({
      type: ActionTypes.GAME_CREATE,
      user,
      createId
    });
  },

  start(id) {
    AppDispatcher.handleAction({
      type: ActionTypes.GAME_START,
      id
    });
  },

  receive(game) {
    AppDispatcher.handleAction({
      type: ActionTypes.GAME_RECEIVE,
      game
    });
  }

};

export default GameActions;
