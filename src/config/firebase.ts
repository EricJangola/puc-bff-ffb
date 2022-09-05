import fs, { ServiceAccount } from 'firebase-admin';

import serviceAccount from './firebase.json';
// const { FB_KEY } = process.env;

fs.initializeApp({
  credential: fs.credential.cert(serviceAccount as ServiceAccount),
});

const admin = fs;

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCuCIPdLRXv22hjVytOBSHpzWxpodevEXI",
//   authDomain: "puc-projeto-final.firebaseapp.com",
//   projectId: "puc-projeto-final",
//   storageBucket: "puc-projeto-final.appspot.com",
//   messagingSenderId: "473018541066",
//   appId: "1:473018541066:web:cfea6c78df21799d7fabf3",
//   measurementId: "G-69LF06HBVD"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default admin;
