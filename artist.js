const firebaseConfig = {
  apiKey: "AIzaSyBq4kcsr_YPqDBN27S8US4XjrIatdfz8Mg",
  authDomain: "artisans-hub-e5aef.firebaseapp.com",
  projectId: "artisans-hub-e5aef",
  storageBucket: "artisans-hub-e5aef.firebasestorage.app",
  messagingSenderId: "586925172007",
  appId: "1:586925172007:web:dc1263f3a0dbae643b7502"
};

// Firebase initialization
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

auth.onAuthStateChanged(user => {
    if (user) {
        document.getElementById('artwork-form').addEventListener('submit', uploadArtwork);
    } else {
        window.location.href = 'index.html';
    }
});

function uploadArtwork(e) {
    e.preventDefault();

    const name = document.getElementById('artwork-name').value;
    const description = document.getElementById('artwork-description').value;
    const price = document.getElementById('artwork-price').value;
    const feedback = document.getElementById('artwork-feedback').value;
    const file = document.getElementById('artwork-image').files[0];
    const user = auth.currentUser;

    if (file && name && description && price && user) {
        const storageRef = storage.ref('artworks/' + file.name);
        storageRef.put(file).then(snapshot => {
            snapshot.ref.getDownloadURL().then(url => {
                db.collection('artworks').add({
                    name: name,
                    description: description,
                    price: parseFloat(price),
                    feedback: feedback,
                    imageUrl: url,
                    artistId: user.uid
                }).then(() => {
                    document.getElementById('message').innerText = 'Artwork uploaded!';
                    document.getElementById('artwork-form').reset();
                }).catch(error => {
                    document.getElementById('message').innerText = 'Error: ' + error.message;
                });
            });
        });
    } else {
        document.getElementById('message').innerText = 'Please fill all required fields.';
    }
}

