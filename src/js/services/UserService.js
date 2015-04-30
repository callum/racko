import Firebase from 'firebase';

const UserService = {

  set(user) {
    const ref = new Firebase(FIREBASE);

    ref.child('users').child(user.get('id')).set(user.toJS());
  },

  setGame(userId, game) {
    const ref = new Firebase(FIREBASE);

    ref.child('users')
      .child(userId)
      .child('games')
      .child(game.get('id'))
      .set(game.toJS());
  }

};

export default UserService;
