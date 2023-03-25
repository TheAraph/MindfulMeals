//Firebase Configuration Key Setup

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

//Firebase Config

const firebaseConfig = {
  apiKey: "AIzaSyBBBYve6HqBN7JlsFuuUMPoFuVtElv8oUY",
  authDomain: "mindfulmeals-26e41.firebaseapp.com",
  projectId: "mindfulmeals-26e41",
  storageBucket: "mindfulmeals-26e41.appspot.com",
  messagingSenderId: "556874442813",
  appId: "1:556874442813:web:e2febf2e94b0de467fe254",
  measurementId: "G-2ZGZ17JSN5"
};

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export {firebase};