import Firebase from 'firebase';
import UserActions from '../actions/UserActions';

const FIREBASE = 'https://dazzling-heat-6913.firebaseio.com/';

const UserSynchronizer = {

  get(id) {
    const user = new Firebase(FIREBASE).child('users').child(id);

    const handler = user.on('value', snapshot => {
      if (snapshot.exists()) {
        UserActions.receive(snapshot.val());
      }
    });

    return () => user.off('value', handler);
  }

};

export default UserSynchronizer;
