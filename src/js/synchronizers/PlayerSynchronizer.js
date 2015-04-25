import Firebase from 'firebase';
import PlayerActions from '../actions/PlayerActions';

const PlayerSynchronizer = {

  getAll(gameId) {
    const players = new Firebase(FIREBASE).child('players').child(gameId);

    const handler = players.on('value', snapshot => {
      if (snapshot.exists()) {
        PlayerActions.receiveAll(gameId, snapshot.val());
      }
    });

    return () => players.off('value', handler);
  }

};

export default PlayerSynchronizer;