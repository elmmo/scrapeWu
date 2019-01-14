const firebase = require('firebase-admin');
const serviceAccount = require('./serverAccessToken.json');

class Firebase {
  static init() {
    firebase.initializeApp({
      credential: firebase.credential.cert(serviceAccount),
      databaseURL: 'https://scrapewu.firebaseio.com'
    });

    var db = firebase.database();
    var dept = db.ref('departments'); 
  } 
  // write getters and setters for this and manipulate through here 
}