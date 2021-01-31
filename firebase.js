import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/auth"; 

const firebaseConfig = {
    apiKey: "AIzaSyBta_LFa36x00GX8z0jIT-i2xhgbbNaRwA",
    authDomain: "blood-bank-app-623da.firebaseapp.com",
    projectId: "blood-bank-app-623da",
    storageBucket: "blood-bank-app-623da.appspot.com",
    messagingSenderId: "100833678613",
    appId: "1:100833678613:web:878ac6fc538e640c63851c"
  };
  let app;
  
  if(firebase.apps.length === 0){
    app=firebase.initializeApp(firebaseConfig);
  }
  else{
    app = firebase.app();
  }

  const db = app.firestore();
  const auth = firebase.auth();

  export {db,auth};