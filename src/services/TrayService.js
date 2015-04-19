import Firebase from 'firebase';

const TrayService = {

  set(gameId, tray) {
    const ref = new Firebase(FIREBASE);

    ref.child('trays').child(gameId).set(tray);
  }

};

export default TrayService;
