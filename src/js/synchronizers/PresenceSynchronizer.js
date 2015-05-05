import Firebase from 'firebase';
import PresenceActions from '../actions/PresenceActions';

const PresenceSynchronizer = {

  get(userId) {
    const presence = new Firebase(FIREBASE).child('presences').child(userId);

    const handler = presence.on('value', snapshot => {
      if (snapshot.exists()) {
        PresenceActions.receive(snapshot.val());
      }
    });

    return () => presence.off('value', handler);
  }

};

export default PresenceSynchronizer;
