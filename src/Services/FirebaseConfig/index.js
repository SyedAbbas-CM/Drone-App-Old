import firebase from '@react-native-firebase/app';
import database from '@react-native-firebase/database';

const config = {
  clientId: '105236065430112899927',
  appId: '1:931509373457:android:3e08a5e3c1f075c7',
  projectId: 'vero-a62a5',
  apiKey: 'AIzaSyDCT0MAvDCwnR1ti7v7ewvJdk29M9WGgDI',
  authDomain: 'vero-a62a5.firebaseapp.com',
  databaseURL: 'https://vero-a62a5.firebaseio.com',
  storageBucket: 'vero-a62a5.appspot.com',
  messagingSenderId: '931509373457',
};

function initFirebase() {
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }
}

initFirebase();
export {firebase};
