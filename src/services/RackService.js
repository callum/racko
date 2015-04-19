import Firebase from 'firebase';

const FIREBASE = 'https://dazzling-heat-6913.firebaseio.com/';

const RackService = {

  set(gameId, racks) {
    const ref = new Firebase(FIREBASE);

    ref.child('racks').child(gameId).set(racks);
  }

};

export default RackService;
