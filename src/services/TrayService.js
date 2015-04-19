import Firebase from 'firebase';

const FIREBASE = 'https://dazzling-heat-6913.firebaseio.com/';

const TrayService = {

  set(gameId, tray) {
    const ref = new Firebase(FIREBASE);

    ref.child('trays').child(gameId).set(tray);
  }

};

export default TrayService;
