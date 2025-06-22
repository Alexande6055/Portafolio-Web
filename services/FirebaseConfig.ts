import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyDX6bcTl9Xep2hiKHy1x22gQgiS45w9ZiM",
    authDomain: "portafolio-web-1cc28.firebaseapp.com",
    projectId: "portafolio-web-1cc28",
    storageBucket: "portafolio-web-1cc28.firebasestorage.app",
    messagingSenderId: "298336564598",
    appId: "1:298336564598:web:8ab7b91e7d500ebb087657"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export { db };