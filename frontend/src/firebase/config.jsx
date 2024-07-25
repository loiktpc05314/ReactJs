import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider} from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDSqxC_xkmpFjeRg9yJMXp48rGzYmD8pFI",
    authDomain: "podcast-4073a.firebaseapp.com",
    projectId: "podcast-4073a",
    storageBucket: "podcast-4073a.appspot.com",
    messagingSenderId: "646206095901",
    appId: "1:646206095901:web:f7c10e06372ee02653fcf4",
    measurementId: "G-CY6CKNY1X1"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
