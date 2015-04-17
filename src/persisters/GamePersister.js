import Firebase from 'firebase';
import AppDispatcher from '../dispatchers/AppDispatcher';
import GameStore from '../stores/GameStore';
import { ActionTypes } from '../constants/GameConstants';

const FIREBASE = 'https://dazzling-heat-6913.firebaseio.com/';

function set(gameId) {
  const game = GameStore.get(gameId);

  if (game.size) {
    const ref = new Firebase(FIREBASE);

    ref.child('games')
      .child(gameId)
      .set(game.toJS());
  }
}

const GamePersister = {

  initialize() {
    this.dispatchToken = AppDispatcher.register(({ action }) => {
      AppDispatcher.waitFor([
        GameStore.dispatchToken
      ]);

      switch (action.type) {
        case ActionTypes.GAME_CREATE:
          window.setTimeout(() => set(action.gameId), 0);
          break;
      }
    });
  }

};

export default GamePersister;
