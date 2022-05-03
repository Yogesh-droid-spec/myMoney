import firebase from "firebase";
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAINhlK_NRmW3PnlQcLlmISB5piivbQAcE",
    authDomain: "mymoney-1b4c7.firebaseapp.com",
    projectId: "mymoney-1b4c7",
    storageBucket: "mymoney-1b4c7.appspot.com",
    messagingSenderId: "891303377167",
    appId: "1:891303377167:web:f240e55e9c214bb7ec267a"
  };

  //init firebase
  firebase.initializeApp(firebaseConfig)

  //init service
  const projectFirestore = firebase.firestore()
  const projectAuth = firebase.auth()

  //timestamp
  const timestamp = firebase.firestore.Timestamp

  export {projectFirestore,projectAuth,timestamp}