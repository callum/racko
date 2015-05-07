import Firebase from 'firebase';

const GameService = {

  set(game) {
    const ref = new Firebase(process.env.FIREBASE);

    ref.child('games').child(game.get('id')).set(game.toJS());
  }

};

export default GameService;
