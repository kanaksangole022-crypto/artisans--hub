const firebaseConfig = {
  apiKey: "AIzaSyBq4kcsr_YPqDBN27S8US4XjrIatdfz8Mg",
  authDomain: "artisans-hub-e5aef.firebaseapp.com",
  projectId: "artisans-hub-e5aef",
  storageBucket: "artisans-hub-e5aef.firebasestorage.app",
  messagingSenderId: "586925172007",
  appId: "1:586925172007:web:dc1263f3a0dbae643b7502"
};

// Firebase configuration block
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

auth.onAuthStateChanged(user => {
    if (user) {
        loadArtworks();
    } else {
        window.location.href = 'index.html';
    }
});

function loadArtworks() {
    const container = document.getElementById('artworks');
    container.innerHTML = ''; // Clear before loading

    db.collection('artworks').get().then(snapshot => {
        snapshot.forEach(doc => {
            const art = doc.data();
            container.innerHTML += `
                <div style="border: 1px solid #ccc; margin: 10px; padding: 10px;">
                    <h3>${art.name}</h3>
                    <p><strong>Description:</strong> ${art.description}</p>
                    <p><strong>Price:</strong> ₹${art.price}</p>
                    <p><strong>Feedback:</strong> ${art.feedback ? art.feedback : 'No feedback available'}</p>
                    <img src="${art.imageUrl}" width="200" />
                </div>
            `;
        });
    }).catch(error => {
        container.innerHTML = '<p>Error loading artworks: ' + error.message + '</p>';
    });
}
