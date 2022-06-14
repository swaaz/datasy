import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';


const firebaseConfig = {
  apiKey: "AIzaSyD4aNlECo0vrDUpGLjW7Nn0sud4kyei4iQ",
  authDomain: "datasy-63189.firebaseapp.com",
  projectId: "datasy-63189",
  storageBucket: "datasy-63189.appspot.com",
  messagingSenderId: "1085249638380",
  appId: "1:1085249638380:web:4235111150dcef06e7bac9",
  measurementId: "G-9EEC92H6YW"
};

let app;

if(firebase.apps.length === 0){
    app = firebase.initializeApp(firebaseConfig);
}
else{
    app = firebase.app();
}

const storage = app.storage();

export { storage };