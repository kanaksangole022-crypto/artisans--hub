// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBq4kcsr_YPqDBN27S8US4XjrIatdfz8Mg",
  authDomain: "artisans-hub-e5aef.firebaseapp.com",
  projectId: "artisans-hub-e5aef",
  storageBucket: "artisans-hub-e5aef.firebasestorage.app",
  messagingSenderId: "586925172007",
  appId: "1:586925172007:web:dc1263f3a0dbae643b7502"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
        const user = userCredential.user;

        // Redirect based on role
        if(role === "artist"){
            window.location.href = "artist-dashboard.html";
        } else if(role === "buyer"){
            window.location.href = "buyer-dashboard.html";
        } else {
            alert("Please select a role.");
        }
    })
    .catch((error) => {
        alert(error.message);
    });
});