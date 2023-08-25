// import  firebase  from "firebase/compat/app";
// import "firebase/compat/database";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB5HuAs9TYOyGXjWDSyW-Ejrs_8Bmk_nQ8",
  authDomain: "todo-app-redux-8e42d.firebaseapp.com",
  projectId: "todo-app-redux-8e42d",
  storageBucket: "todo-app-redux-8e42d.appspot.com",
  messagingSenderId: "86591892089",
  appId: "1:86591892089:web:b3a4c370ef2851d91c82a8"
};
const app = initializeApp(firebaseConfig);

// firebase.initializeApp(firebaseConfig)
// export const dataRef =firebase.database();
const db = getFirestore(app);

export default db;
// export default firebase;