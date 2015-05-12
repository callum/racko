import Firebase from 'firebase';

import DrawActions from '../actions/DrawActions';
import TrayUtils from '../utils/TrayUtils';

const TrayService = {

  set(gameId, tray) {
    const ref = new Firebase(process.env.FIREBASE);

    ref.child('trays').child(gameId).set(tray);
  },

  getDrawTail(gameId) {
    const ref = new Firebase(process.env.FIREBASE);

    const drawTail = ref.child('trays')
      .child(gameId)
      .child('draw')
      .orderByKey()
      .limitToLast(1);

    drawTail.once('value', snapshot => {
      if (snapshot.exists()) {
        const value = snapshot.val();

        for (let prop in value) {
          DrawActions.receiveTail(gameId, value[prop]);
          return;
        }
      }
    });
  },

  discard(gameId, discarded) {
    const ref = new Firebase(process.env.FIREBASE);

    const tray = ref.child('trays').child(gameId);

    tray.once('value', (snapshot) => {
      if (snapshot.exists()) {
        const updatedTray = TrayUtils.discard(snapshot.val(), discarded);

        tray.set(updatedTray);
      }
    });
  }

};

export default TrayService;
