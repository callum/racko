import Firebase from 'firebase';
import DiscardActions from '../actions/DiscardActions';

const DiscardSynchronizer = {

  get(gameId) {
    const tray = new Firebase(FIREBASE)
      .child('trays')
      .child(gameId)
      .child('discard')
      .orderByKey();

    const handler = tray.on('value', snapshot => {
      if (snapshot.exists()) {
        DiscardActions.receive(gameId, snapshot.val());
      }
    });

    return () => tray.off('value', handler);
  }

};

export default DiscardSynchronizer;
