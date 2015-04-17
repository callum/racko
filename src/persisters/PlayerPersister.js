import Firebase from 'firebase';
import AppDispatcher from '../dispatchers/AppDispatcher';
import PlayerStore from '../stores/PlayerStore';
import { ActionTypes } from '../constants/PlayerConstants';

const FIREBASE = 'https://dazzling-heat-6913.firebaseio.com/';

function create(gameId, userId) {
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
        case ActionTypes.PLAYER_CREATE:
          window.setTimeout(() => create(action.gameId, action.userId), 0);

          break;
      }
    });
  }

};

export default PlayerPersister;
