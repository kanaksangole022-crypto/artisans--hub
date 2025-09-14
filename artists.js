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

const uploadForm = document.getElementById("upload-form");

uploadForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("artwork-name").value;
    const image = document.getElementById("artwork-image").files[0];

    if (!image) {
        alert("Please select an image.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        const imageData = event.target.result;

        db.collection("artworks").add({
            name: name,
            image: imageData
        })
        .then(() => {
            alert("Artwork uploaded!");
            uploadForm.reset();
        })
        .catch((error) => {
            alert(error.message);
        });
    };
    reader.readAsDataURL(image);
});