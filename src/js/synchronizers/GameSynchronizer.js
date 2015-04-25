import Firebase from 'firebase';
import GameActions from '../actions/GameActions';

const GameSynchronizer = {

  get(gameId) {
    const game = new Firebase(FIREBASE).child('games').child(gameId);

    const handler = game.on('value', snapshot => {
      if (snapshot.exists()) {
        GameActions.receive(snapshot.val());
      }
    });

    return () => game.off('value', handler);
  }

};

export default GameSynchronizer;
