import { loginComponent, getStart } from './index';

import * as firebase from 'firebase/app';
import 'firebase/firestore';

const config = {
  apiKey: "AIzaSyAsw1-eTGCyms7tDtu0AalowAL5zEBGJq4",
  authDomain: "z-game-5cbe3.firebaseapp.com",
  databaseURL: "https://z-game-5cbe3.firebaseio.com",
  projectId: "z-game-5cbe3",
  storageBucket: "z-game-5cbe3.appspot.com",
  messagingSenderId: "818955601860"
};

firebase.initializeApp(config);

const settings = {timestampsInSnapshots: true};
const database = firebase.firestore();
database.settings(settings);

const searchUser = (username, password) => {
  const docRef = database.collection('users').doc(username); 
  docRef.get().then(function(doc) {
    if (doc.exists) {      
      password === doc.data().password ? getStart() : loginComponent.formMessage.textContent = 'Неверное имя или пароль';
    } else {
        loginComponent.formMessage.textContent = 'Такой пользователь не зарегистрирован';
      }
  }).catch(function(error) {
      console.log("Error getting document:", error);
    });
};

const addUser = (username, password) => {
  const docRef = database.collection('users').doc(username); 
  docRef.get().then(function(doc) {
    if (doc.exists) {     
        loginComponent.formMessage.textContent = 'Пользователь уже существует';
    } else {
        const userInfo = {
          username: username,
          password: password,
          score: 0
        };     
      docRef.set(userInfo)
      getStart()
    }
  }).catch(function(error) {
    console.log("Error setting document:", error);
  });
};

export { database, searchUser, addUser };
