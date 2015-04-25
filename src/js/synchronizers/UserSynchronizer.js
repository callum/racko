import Firebase from 'firebase';
import UserActions from '../actions/UserActions';

const UserSynchronizer = {

  get(userId) {
    const user = new Firebase(FIREBASE).child('users').child(userId);

    const handler = user.on('value', snapshot => {
      if (snapshot.exists()) {
        UserActions.receive(snapshot.val());
      }
    });

    return () => user.off('value', handler);
  }

};

export default UserSynchronizer;
