import { States } from '../constants/GameConstants';

export default class GameHelper {

  static MIN_PLAYERS = 2;
  static MAX_PLAYERS = 4;

  constructor(game) {
    this.game = game;
  }

  isJoined(user) {
    return !!this.game.getIn(['players', user.get('id')]);
  }

  isTurn(user) {
    return this.game.get('turn') === user.get('id');
  }

  isHost(user) {
    return this.game.get('host') === user.get('id');
  }

  isWinner(user) {
    return this.game.get('winner') === user.get('id');
  }

  get winnerName() {
    const winner = this.game.getIn(['players', this.game.get('winner')]);

    if (winner) {
      return winner.get('name');
    }
  }

  get canJoin() {
    return this.game.get('players').size < GameHelper.MAX_PLAYERS;
  }

  get canStart() {
    return this.game.get('players').size >= GameHelper.MIN_PLAYERS;
  }

  get isCreated() {
    return this.game.get('state') === States.GAME_CREATED;
  }

  get isStarted() {
    return this.game.get('state') === States.GAME_STARTED;
  }

  get isEnded() {
    return this.game.get('state') === States.GAME_ENDED;
  }

}
