import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import { firebaseConfig } from './firebase_config'


firebase.initializeApp(firebaseConfig)
// console.log(firebase)
export default firebase