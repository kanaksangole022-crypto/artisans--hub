const firebaseConfig = {
  apiKey: "AIzaSyBq4kcsr_YPqDBN27S8US4XjrIatdfz8Mg",
  authDomain: "artisans-hub-e5aef.firebaseapp.com",
  projectId: "artisans-hub-e5aef",
  storageBucket: "artisans-hub-e5aef.firebasestorage.app",
  messagingSenderId: "586925172007",
  appId: "1:586925172007:web:dc1263f3a0dbae643b7502"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const artworksList = document.getElementById("artworks-list");

db.collection("artworks").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        const data = doc.data();

        const div = document.createElement("div");
        div.innerHTML = `
            <h3>${data.name}</h3>
            <img src="${data.image}" width="200"><br><br>
            <button>Buy</button><hr>
        `;
        artworksList.appendChild(div);
    });
});