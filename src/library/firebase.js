// import firebase from "firebase/app";
// import "firebase/auth";
// import "firebase/firestore";
// import "firebase/storage";
import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore';
import { getAuth } from 'firebase/auth'

// const app = firebase.initializeApp({
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID
// });

// const app = firebase.initializeApp({
//   apiKey: "AIzaSyBfhq694Kix0Yrw0JY5hOYoVeBAONsqT64",
//   authDomain: "eshop-dev-504cd.firebaseapp.com",
//   databaseURL: "https://eshop-dev-504cd-default-rtdb.firebaseio.com",
//   projectId: "eshop-dev-504cd",
//   storageBucket: "eshop-dev-504cd.appspot.com",
//   messagingSenderId: "446561542582",
//   appId: "1:446561542582:web:11f21bb95aba1ece9f6117"
// });

// export const auth = app.auth();
// export const db = app.firestore();
// export const storage = app.storage();

// export default app;

const firebaseConfig = {
  apiKey: "AIzaSyBfhq694Kix0Yrw0JY5hOYoVeBAONsqT64",
  authDomain: "eshop-dev-504cd.firebaseapp.com",
  databaseURL: "https://eshop-dev-504cd-default-rtdb.firebaseio.com",
  projectId: "eshop-dev-504cd",
  storageBucket: "eshop-dev-504cd.appspot.com",
  messagingSenderId: "446561542582",
  appId: "1:446561542582:web:11f21bb95aba1ece9f6117"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const database = getFirestore(app);

export default app;