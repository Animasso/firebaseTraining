// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  orderBy,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEhS9kGin6WU9LIgkpmHfPfaNRBCwjH8s",
  authDomain: "fireexo-d1776.firebaseapp.com",
  projectId: "fireexo-d1776",
  storageBucket: "fireexo-d1776.appspot.com",
  messagingSenderId: "562307295843",
  appId: "1:562307295843:web:9ea2f49422383dd9092656",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const colRef = collection(db, "movies");
const oneDoc = doc(db, "movies", "blhBDwk413nv6QMWuari");
const auth = getAuth();

// filter according to the query selected
const qRef = query(
  colRef,
  where("category", "==", "action"),
  orderBy("createdAt")
);

//get all the documents
getDocs(colRef)
  .then((data) => {
    let movies = [];
    data.docs.forEach((document) => {
      movies.push({ ...document.data(), id: document.id });
    });
    console.log("movies:", movies);
  })
  .catch((error) => {
    console.log(error);
  });

//fonction call at every change
// onSnapshot(colRef, (data) => {
//   let movies = [];
//   data.docs.forEach((document) => {
//     movies.push({ ...document.data(), id: document.id });
//   });
//   console.log(movies);
// });
//add a document
const addForm = document.querySelector(".formMovie");
console.log("addForm:", addForm);
addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addDoc(colRef, {
    name: addForm.name.value,
    category: addForm.category.value,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  }).then(() => {
    addForm.reset();
  });
});

//Delete a document
const deleteForm = document.querySelector(".delete");
deleteForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const docReference = doc(db, "movies", deleteForm.id.value);
  deleteDoc(docReference).then(() => {
    deleteForm.reset();
  });
});

//get one document
onSnapshot(oneDoc, (document) => {
  console.log(document.data(), document.id);
});

//udate the form
const updateForm = document.querySelector(".update");
updateForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const docReference = doc(db, "movies", updateForm.id.value);
  updateDoc(docReference, {
    name: updateForm.name.value,
    updatedAt: serverTimestamp(),
  }).then(() => {
    updateForm.reset();
  });
});

//to register
const registerForm = document.querySelector(".register");
registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  createUserWithEmailAndPassword(
    auth,
    registerForm.email.value,
    registerForm.password.value
  )
    .then((credentials) => {
      console.log("credentials:", credentials);
      registerForm.reset();
    })
    .catch((error) => {
      console.log("error:", error);
    });
});

//to logout
const logoutbutton = document.querySelector(".logout");
logoutbutton.addEventListener("click", (e) => {
  e.preventDefault();
  signOut(auth)
    .then(() => {
      console.log("im out");
    })
    .catch((error) => {
      console.log(error);
    });
});
// to login
const loginForm = document.querySelector(".login");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  signInWithEmailAndPassword(
    auth,
    loginForm.email.value,
    loginForm.password.value
  )
    .then((credentials) => {
      console.log("credentials:", credentials);
      loginForm.reset();
    })
    .catch((error) => {
      console.log("error:", error);
    });
});
