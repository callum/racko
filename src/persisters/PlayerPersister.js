import Firebase from 'firebase';
import AppDispatcher from '../dispatchers/AppDispatcher';
import PlayerStore from '../stores/PlayerStore';

import { ActionTypes as PlayerActionTypes } from '../constants/PlayerConstants';
import { ActionTypes as GameActionTypes } from '../constants/GameConstants';

const FIREBASE = 'https://dazzling-heat-6913.firebaseio.com/';

function set(gameId, userId) {
  const player = PlayerStore.get(gameId, userId);

  if (player.size) {
    const ref = new Firebase(FIREBASE);

    ref.child('players')
      .child(gameId)
      .child(userId)
      .set(player.toJS());
  }
}

const PlayerPersister = {

  initialize() {
    this.dispatchToken = AppDispatcher.register(({ action }) => {
      AppDispatcher.waitFor([
        PlayerStore.dispatchToken
      ]);

      switch (action.type) {
        case PlayerActionTypes.PLAYER_CREATE:
        case GameActionTypes.GAME_CREATE:
          window.setTimeout(() => set(action.gameId, action.userId), 0);
          break;
      }
    });
  }

};

export default PlayerPersister;
