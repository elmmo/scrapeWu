const firebase = require('firebase-admin');
const serviceAccount = require('./serverAccessToken.json');

var db; 
var dept; 
var cs; 

class Firebase {
  // initializes the firebase connection 
  static init() {
    firebase.initializeApp({
      credential: firebase.credential.cert(serviceAccount),
      databaseURL: 'https://scrapewu.firebaseio.com'
    });

    db = firebase.database();
    dept = db.ref('departments'); 
  }; 

  static set(department, obj) {
    let title = obj.title; 
    let ref = db.ref(`departments/${department}`);
    ref.child(title).set({
      codes: obj.codes, 
      rows: obj.rows
    })
  }; 

  static get(department, major) {
    let ref = db.ref(`departments/${department}/${major}`); 
    return ref.once('value');
  }
}

module.exports = Firebase; 