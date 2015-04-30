import Firebase from 'firebase';

const RackService = {

  set(gameId, userId, rack) {
    const ref = new Firebase(FIREBASE);

    ref.child('racks').child(gameId).child(userId).set(rack.toJS());
  },

  setAll(gameId, racks) {
    const ref = new Firebase(FIREBASE);

    ref.child('racks').child(gameId).set(racks);
  }

};

export default RackService;
