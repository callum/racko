import Immutable from 'immutable';
import AppDispatcher from '../dispatchers/AppDispatcher';
import GameStore from '../stores/GameStore';
import { ActionTypes, States } from '../constants/GameConstants';

const FIREBASE = 'https://dazzling-heat-6913.firebaseio.com/';

function create(user, createId) {
  let game = GameStore.get(createId);

  if (game) {
    let ref = new Firebase(FIREBASE);

    ref.child('games')
      .child(game.id).set(game);

    ref.child('users')
      .child(user.id).child('games').child(game.id).set(true);

    ref.child('players')
      .child(game.id).child(user.id).set({ name: user.name });
  }
}

const GamePersister = {

  initialize() {
    this.dispatchToken = AppDispatcher.register(payload => {
      let { action } = payload;

      AppDispatcher.waitFor([
        GameStore.dispatchToken
      ]);

      switch (action.type) {
        case ActionTypes.GAME_CREATE:
          create(action.user, action.createId);

          break;
      }
    });
  }

};

export default GamePersister;
