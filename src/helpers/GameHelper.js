import { States } from '../constants/GameConstants';

export default class GameHelper {

  static MIN_PLAYERS = 2;
  static MAX_PLAYERS = 4;

  constructor(game, players) {
    this.game = game;
    this.players = players;
  }

  isJoined(user) {
    return !!this.players.get(user.get('id'));
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
    return this.players.get(this.game.get('winner')).get('name');
  }

  get canJoin() {
    return this.players.size < GameHelper.MAX_PLAYERS;
  }

  get canStart() {
    return this.players.size >= GameHelper.MIN_PLAYERS;
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
