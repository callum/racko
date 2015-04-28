import Firebase from 'firebase';

const RackService = {

  set(gameId, racks) {
    const ref = new Firebase(process.env.FIREBASE);

    ref.child('racks').child(gameId).set(racks);
  }

};

export default RackService;
