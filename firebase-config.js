// Copy this configuration from Firebase Console > Project settings > Your apps.
import { initializeApp } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyAjMRGeDNx68RP4w3A7y_lgTDFKfk7aXRg",
  authDomain: "primewebtechnology-72850.firebaseapp.com",
  projectId: "primewebtechnology-72850",
  storageBucket: "primewebtechnology-72850.firebasestorage.app",
  messagingSenderId: "1043901060010",
  appId: "1:1043901060010:web:80baacd49015b8b60f51d3",
  measurementId: "G-E739XJHXSD"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics, firebaseConfig };