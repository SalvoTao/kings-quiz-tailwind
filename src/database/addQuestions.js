import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// Configura Firebase (usa i tuoi dati reali)
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
const db = getFirestore(app);

// Array di domande da aggiungere
const questions = [
    {
        categoria: "Matematica",
        domanda: "Qual è il risultato della somma dei primi 10 numeri naturali?",
        risposte: ["45", "50", "55", "60"],
        corretta: "55",
        punteggio: 500,
        mostrata: 0,
        spiegazione: "La somma dei primi n numeri naturali si calcola con la formula n(n+1)/2. Per i primi 10 numeri: 10(10+1)/2 = 55."
    }
];

// Funzione per caricare le domande in Firestore
const addQuestionsToFirestore = async () => {
    try {
        const collectionRef = collection(db, "domande");
        for (const question of questions) {
            await addDoc(collectionRef, question);
            console.log(`✅ Aggiunta domanda: ${question.domanda}`);
        }
        console.log("🎉 Tutte le domande sono state caricate con successo!");
    } catch (error) {
        console.error("❌ Errore nel caricamento delle domande:", error);
    }
};

// Esegui la funzione
addQuestionsToFirestore();