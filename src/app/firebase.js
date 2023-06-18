'use client'

import { initializeApp } from "firebase/app";
import { FacebookAuthProvider, GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDaHxOrGH6nVEUGto-ycY63T-dk6e9g_WA",
  authDomain: "expensetracker-8328f.firebaseapp.com",
  databaseURL: "https://expensetracker-8328f-default-rtdb.firebaseio.com",
  projectId: "expensetracker-8328f",
  storageBucket: "expensetracker-8328f.appspot.com",
  messagingSenderId: "1021488764731",
  appId: "1:1021488764731:web:eeb8196b64f0063651c91e"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

const provider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const githubProvider = new GithubAuthProvider();

export const signInWithGoogle = () => {
    return new Promise((resolve, reject) => {
      signInWithPopup(auth, provider)
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

export const signInWithFacebook = () => {
    signInWithPopup(auth, facebookProvider).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })
}

export const signInWithGithub = () => {
    signInWithPopup(auth, githubProvider).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })
}

export const logout = () => {

    return new Promise((resolve, reject) => {
      signOut(auth)
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
}

export const db = getFirestore(app);

