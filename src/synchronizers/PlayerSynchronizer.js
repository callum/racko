import Firebase from 'firebase';
import PlayerActions from '../actions/PlayerActions';

const FIREBASE = 'https://dazzling-heat-6913.firebaseio.com/';

const PlayerSynchronizer = {

  get(gameId) {
    let players = new Firebase(FIREBASE).child('players').child(gameId);

    let handler = players.on('value', snapshot => {
      if (snapshot.exists()) {
        PlayerActions.receive(gameId, snapshot.val());
      }
    });

    return () => players.off('value', handler);
  }

};

export default PlayerSynchronizer;
