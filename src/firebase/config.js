import firebase from "firebase";
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyD3ZBute3EgDSOkXf3ofK3lyhCFJJkJzAY",
  authDomain: "olxclone-e25ab.firebaseapp.com",
  projectId: "olxclone-e25ab",
  storageBucket: "olxclone-e25ab.appspot.com",
  messagingSenderId: "445594058085",
  appId: "1:445594058085:web:122900a60d42111a53358c",
  measurementId: "G-0YTP96DT1R"
};

export default firebase.initializeApp(firebaseConfig)