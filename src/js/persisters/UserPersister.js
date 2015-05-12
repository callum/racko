import Immutable from 'immutable';

import AppDispatcher from '../dispatchers/AppDispatcher';
import UserService from '../services/UserService';
import GameStore from '../stores/GameStore';
import UserStore from '../stores/UserStore';

import { ActionTypes as GameActionTypes } from '../constants/GameConstants';
import { ActionTypes as RackActionTypes } from '../constants/RackConstants';
import { ActionTypes as UserActionTypes } from '../constants/UserConstants';

function set(userId) {
  const user = UserStore.get(userId);

  if (user) {
    UserService.set(user);
  }
}

function setAllGames(gameId) {
  const game = GameStore.get(gameId);

  if (game) {
    game.get('players').forEach(player => {
      UserService.setGame(player.get('id'), Immutable.fromJS({
        id: game.get('id'),
        updatedAt: game.get('updatedAt')
      }));
    });
  }
}

const UserPersister = {

  initialize() {
    AppDispatcher.register(({ action }) => {

      switch (action.type) {
        case UserActionTypes.USER_CREATE:
          AppDispatcher.waitFor([
            UserStore.dispatchToken
          ]);

          window.setTimeout(() => set(action.userId), 0);
          break;

        case GameActionTypes.GAME_CREATE:
        case GameActionTypes.GAME_START:
        case GameActionTypes.GAME_END:
        case GameActionTypes.GAME_JOIN:
        case GameActionTypes.GAME_END_TURN:
        case RackActionTypes.RACK_SWAP:
          AppDispatcher.waitFor([
            GameStore.dispatchToken
          ]);

          window.setTimeout(() => setAllGames(action.gameId), 0);
          break;
      }
    });
  }

};

export default UserPersister;
