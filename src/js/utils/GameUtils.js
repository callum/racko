import GameStore from '../stores/GameStore';

import RackService from '../services/RackService';
import TrayService from '../services/TrayService';

import next from 'array-next';
import { range } from 'range';
import { shuffle } from 'deck';

const GameUtils = {

  getNextTurn(game, userId) {
    const playerIds = GameStore.getPlayers(game.get('id')).map(player => {
      return player.get('id');
    }).toArray();

    return next(playerIds, userId);
  },

  createDeck(playerCount) {
    let size;

    switch (playerCount) {
      case 2:
        size = 40;
        break;
      case 3:
        size = 50;
        break;
      case 4:
        size = 60;
        break;
    }

    return shuffle(range(1, size + 1));
  },

  createRacks(players, deck) {
    return players.reduce((racks, player) => {
      return Object.assign({
        [player.get('id')]: deck.splice(0, 10)
      }, racks);
    }, {});
  },

  setup(gameId) {
    const game = GameStore.get(gameId);
    const deck = GameUtils.createDeck(game.get('players').size);
    const racks = GameUtils.createRacks(game.get('players'), deck);

    const draw = [...deck];
    const discard = [draw.pop()];

    RackService.setAll(gameId, racks);
    TrayService.set(gameId, { draw, discard });

    return {
      rack: racks[game.host],
      discard
    };
  }

};

export default GameUtils;
