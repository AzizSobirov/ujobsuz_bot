const firebase = require("firebase/app");
const database = require("firebase/database");
const firebaseConfig = {
  apiKey: "AIzaSyAAt42Eq40WQk0ADcUX9SY4-ge9T-NW9ts",
  authDomain: "lazzat-27ae6.firebaseapp.com",
  projectId: "lazzat-27ae6",
  storageBucket: "lazzat-27ae6.appspot.com",
  messagingSenderId: "133989037628",
  appId: "1:133989037628:web:c19203aae667f9d64af539",
  measurementId: "G-RQ80MVZXLD",
};

const app = firebase.initializeApp(firebaseConfig);
const db = database.getDatabase(app);

module.exports = db;
