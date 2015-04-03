import Firebase from 'firebase';
import GameActions from '../actions/GameActions';

const FIREBASE = 'https://dazzling-heat-6913.firebaseio.com/';

const GameSynchronizer = {

  get(id) {
    let game = new Firebase(FIREBASE).child('games').child(id);

    let handler = game.on('value', snapshot => {
      if (snapshot.exists()) {
        GameActions.receive(snapshot.val());
      }
    });

    return () => game.off.bind('value', handler);
  }

};

export default GameSynchronizer;
