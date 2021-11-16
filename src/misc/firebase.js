import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const config = {
  apiKey: 'AIzaSyCP8RWfoawMN13JSlHjk2OOAzv-Q7AKAs0',
  authDomain: 'chat-web-app-f0d15.firebaseapp.com',
  databaseURL:
    'https://chat-web-app-f0d15-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'chat-web-app-f0d15',
  storageBucket: 'chat-web-app-f0d15.appspot.com',
  messagingSenderId: '881013767727',
  appId: '1:881013767727:web:6d35c06be0f60b936f90da',
};

const app = firebase.initializeApp(config);
export const auth = app.auth();
export const database = app.database();
export const storage = app.storage();
