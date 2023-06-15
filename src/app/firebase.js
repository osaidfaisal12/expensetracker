'use client'

import { initializeApp } from "firebase/app";
import { FacebookAuthProvider, GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { Firestore, collection, doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { resolve } from "styled-jsx/css";

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
      const provider = new GoogleAuthProvider();
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

// const test = doc(db, 'test', 'test' )
// export function testFunc() {
//     const docData = {
//         stringExample: 'Hello world!',
//         booleanExample: true,
//     }
//     setDoc(test, docData)
// }
// testFunc()

export const db = getFirestore(app);

// export const writeUserData = async(userID, data) => {
//   try{
//     const docRef = doc(db, "users", userID)
//     await setDoc(docRef, data)
//     console.log("Document written with ID");
//   } catch(e) {
//     console.error("Error adding document: ", e);
//   }
// }
// const userId = 'yvqPtSw6kKVC5z6nig4BBDwdHTF2'
// writeUserData(userId , {test: "hapi hapi"})

// export const fetchExpense = async () => {
//   try {
//     const docRef = doc(
//       collection(db, "users", "2otBLmM7LUZViuoJRHrhUsqGYgy1", "Expenses"),
//       "1221"
//     );
//     const docSnap = await getDoc(docRef);
//     if (docSnap.exists()) {
//       console.log(docSnap.data());
//     } else {
//       console.log("Document does not exist");
//     }
//   } catch (e) {
//     console.error("Error fetching document: ", e);
//   }
// }
// fetchExpense()