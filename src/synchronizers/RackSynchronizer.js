import Firebase from 'firebase';
import RackActions from '../actions/RackActions';

const FIREBASE = 'https://dazzling-heat-6913.firebaseio.com/';

const RackSynchronizer = {

  get(gameId, userId) {
    let rack = new Firebase(FIREBASE).child('racks').child(gameId).child(userId);

    let handler = rack.on('value', snapshot => {
      if (snapshot.exists()) {
        RackActions.receive(gameId, userId, snapshot.val());
      }
    });

    return () => rack.off('value', handler);
  }

};

export default RackSynchronizer;
