import Firebase from 'firebase';

const UserService = {

  set(user) {
    const ref = new Firebase(FIREBASE);

    ref.child('users').child(user.get('id')).set(user.toJS());
  }

};

export default UserService;
