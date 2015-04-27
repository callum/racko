import Firebase from 'firebase';
import AppDispatcher from '../dispatchers/AppDispatcher';
import GameStore from '../stores/GameStore';
import { ActionTypes as GameActionTypes } from '../constants/GameConstants';
import { ActionTypes as RackActionTypes } from '../constants/RackConstants';

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
        case GameActionTypes.GAME_CREATE:
        case GameActionTypes.GAME_START:
        case GameActionTypes.GAME_END:
        case GameActionTypes.GAME_JOIN:
        case GameActionTypes.GAME_END_TURN:
        case RackActionTypes.RACK_SWAP:
          window.setTimeout(() => set(action.gameId), 0);
          break;
      }
    });
  }

};

export default GamePersister;
