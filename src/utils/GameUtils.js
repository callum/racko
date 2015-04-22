import PlayerStore from '../stores/PlayerStore';

import RackService from '../services/RackService';
import TrayService from '../services/TrayService';

import next from 'array-next';
import { range } from 'range';
import { shuffle } from 'deck';

const GameUtils = {

  getNextTurn(game, userId) {
    const playerIds = PlayerStore.getAll(game.get('id')).map(player => {
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

  setup(game) {
    const gameId = game.get('id');
    const players = PlayerStore.getAll(gameId);

    const deck = GameUtils.createDeck(players.size);
    const racks = GameUtils.createRacks(players, deck);

    const draw = [...deck];
    const discard = [draw.pop()];

    RackService.set(gameId, racks);
    TrayService.set(gameId, { draw, discard });

    return {
      rack: racks[game.host],
      discard
    };
  }

};

export default GameUtils;
