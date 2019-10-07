import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyChQAB01vVgKvgdPGPX9XOtGqNn7ry-oBA",
  authDomain: "dev-chat-clone.firebaseapp.com",
  databaseURL: "https://dev-chat-clone.firebaseio.com",
  projectId: "dev-chat-clone",
  storageBucket: "dev-chat-clone.appspot.com",
  messagingSenderId: "207472470941",
  appId: "1:207472470941:web:497b116d1a292743badd74"
};

firebase.initializeApp(firebaseConfig)
// console.log(firebase)
export default firebase