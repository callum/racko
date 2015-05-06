import Firebase from 'firebase';

const PresenceService = {

  set(userId) {
    const connected = new Firebase(process.env.FIREBASE)
      .child('.info/connected');

    const presence = new Firebase(process.env.FIREBASE)
      .child('presences')
      .child(userId);

    connected.on('value', snapshot => {
      if (snapshot.val()) {
        presence.child('id').set(userId);

        presence.child('connections')
          .push(true)
          .onDisconnect()
          .remove();

        presence.child('seenAt')
          .onDisconnect()
          .set(Firebase.ServerValue.TIMESTAMP);
      }
    });
  }

};

export default PresenceService;
