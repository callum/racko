import next from 'array-next';
import { range } from 'range';
import { shuffle } from 'deck';

import RackService from '../services/RackService';
import TrayService from '../services/TrayService';
import GameStore from '../stores/GameStore';

const GameUtils = {

  getNextTurn(game, userId) {
    const playerIds = game.get('players').map(player => {
      return player.get('id');
    }).toArray();

    return next(playerIds, userId);
  },

  getPlayerList(game) {
    const names = game.get('players').map(player => {
      return player.get('name');
    }).toArray();

    if (names.length === 1) {
      return names[0];
    }

    return `${names.slice(0, -1).join(', ')} and ${names.slice(-1)}`;
  },

  createDeck(playerCount) {
    const size = (playerCount + 2) * 10;

    return shuffle(range(1, size + 1));
  },

  createRacks(players, deck) {
    return players.reduce((racks, player) => {
      racks[player.get('id')] = deck.splice(0, 10);
      return racks;
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
