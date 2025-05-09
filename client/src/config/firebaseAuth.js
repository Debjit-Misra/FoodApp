import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAVeVxHGWQwGLUGqvr7RsEtbguCKc7z5Oc",
  authDomain: "swiggy-project-4690c.firebaseapp.com",
  projectId: "swiggy-project-4690c",
  storageBucket: "swiggy-project-4690c.firebasestorage.app",
  messagingSenderId: "1011987395654",
  appId: "1:1011987395654:web:7de0514d5d69b794ec8647",
  measurementId: "G-JSM031BSJK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
