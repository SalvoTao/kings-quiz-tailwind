import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Configurazione Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCMSk5JFyMAZadLg-dEoUF_Aq6Pvqt_2-U",
  authDomain: "kings-quiz-85497.firebaseapp.com",
  projectId: "kings-quiz-85497",
  storageBucket: "kings-quiz-85497.appspot.com",
  messagingSenderId: "631253911516",
  appId: "1:631253911516:web:89c580418c7c8f7c097119",
  measurementId: "G-FKPT9QETJJ"
};

// Inizializza Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // 🔥 Aggiunto Firestore correttamente

export { db };