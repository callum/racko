import Firebase from 'firebase';
import TrayActions from '../actions/TrayActions';

const FIREBASE = 'https://dazzling-heat-6913.firebaseio.com/';

const TraySynchronizer = {

  get(gameId) {
    let tray = new Firebase(FIREBASE).child('trays').child(gameId).orderByKey().limitToFirst(1);

    let handler = tray.on('value', snapshot => {
      if (snapshot.exists()) {
        TrayActions.receiveDiscardHead(snapshot.val());
      }
    });

    return tray.off.bind(this, 'value', handler);
  }

};

export default TraySynchronizer;
