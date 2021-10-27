 import firebase from 'firebase';
 require('@firebase/firestore')
 
 var firebaseConfig = {
    apiKey: "AIzaSyCx_4paiLvHWHYQJ5Y7aC77XHY8FUieW-w",
  authDomain: "new-barter-app-c6c65.firebaseapp.com",
  projectId: "new-barter-app-c6c65",
  storageBucket: "new-barter-app-c6c65.appspot.com",
  messagingSenderId: "69368364084",
  appId: "1:69368364084:web:a239c045da3ff1385e9e61"
  };

  // Initialize Firebase 
  if(!firebase.apps.length){ let app = firebase.initializeApp(firebaseConfig); }

  export default firebase.firestore()