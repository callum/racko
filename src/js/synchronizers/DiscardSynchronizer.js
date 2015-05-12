import Firebase from 'firebase';
import DiscardActions from '../actions/DiscardActions';

const DiscardSynchronizer = {

  get(gameId) {
    const tray = new Firebase(process.env.FIREBASE)
      .child('trays')
      .child(gameId)
      .child('discard')
      .orderByKey()
      .limitToFirst(1);

    const handler = tray.on('value', snapshot => {
      if (snapshot.exists()) {
        const value = snapshot.val();

        for (let prop in value) {
          DiscardActions.receiveHead(gameId, value[prop]);
          return;
        }
      }
    });

    return () => tray.off('value', handler);
  }

};

export default DiscardSynchronizer;
