import Firebase from 'firebase';
import AppDispatcher from '../dispatchers/AppDispatcher';
import GameStore from '../stores/GameStore';
import UserStore from '../stores/UserStore';
import { ActionTypes } from '../constants/GameConstants';

const FIREBASE = 'https://dazzling-heat-6913.firebaseio.com/';

function create(id, userId) {
  const game = GameStore.get(id);
  const user = UserStore.get(userId);

  if (game.size) {
    const ref = new Firebase(FIREBASE);

    ref.child('games')
      .child(id)
      .set(game.toJS());

    ref.child('users')
      .child(userId)
      .child('games')
      .child(id)
      .set(true);

    ref.child('players')
      .child(id)
      .child(userId)
      .set({
        id: userId,
        name: user.get('name')
      });
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
          window.setTimeout(() => create(action.id, action.userId), 0);

          break;
      }
    });
  }

};

export default GamePersister;
