import Firebase from 'firebase';
import RackActions from '../actions/RackActions';

const RackSynchronizer = {

  get(gameId, userId) {
    const rack = new Firebase(FIREBASE)
      .child('racks')
      .child(gameId)
      .child(userId)
      .orderByKey();

    const handler = rack.on('value', snapshot => {
      if (snapshot.exists()) {
        const rack = snapshot.val().reduce((reduction, card, i) => {
          return Object.assign({ [i]: card }, reduction);
        }, {});

        RackActions.receive(gameId, userId, rack);
      }
    });

    return () => rack.off('value', handler);
  }

};

export default RackSynchronizer;
