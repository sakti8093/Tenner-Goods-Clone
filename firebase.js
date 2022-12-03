// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChMhfoj0B55KburItj7nnsTdgewRzitRU",
  authDomain: "tenner-goods.firebaseapp.com",
  projectId: "tenner-goods",
  storageBucket: "tenner-goods.appspot.com",
  messagingSenderId: "606418437281",
  appId: "1:606418437281:web:721c4218be6ac52e1ddce0",
  measurementId: "G-0B3HJF8GJF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)