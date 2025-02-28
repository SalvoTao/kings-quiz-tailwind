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
    domanda: "Secondo il teorema di Fermat, quale tipo di numeri primi può essere scritto come somma di due quadrati?",
    risposte: [
      "I numeri primi della forma 4k+1",
      "I numeri primi della forma 4k+3",
      "Tutti i numeri primi",
      "Solo i numeri primi pari"
    ],
    corretta: "I numeri primi della forma 4k+1",
    punteggio: 500,
    mostrata: 0,
    spiegazione: "Il teorema di Fermat afferma che un numero primo può essere espresso come somma di due quadrati se e solo se è della forma 4k+1."
  },
  {
    categoria: "Matematica",
    domanda: "Cosa afferma il teorema fondamentale dell'aritmetica?",
    risposte: [
      "Ogni numero intero maggiore di 1 può essere scritto in modo unico come prodotto di numeri primi",
      "Ogni numero è divisibile per 1 e per sé stesso",
      "Ogni numero pari è divisibile per 2",
      "Ogni numero naturale ha un numero primo associato"
    ],
    corretta: "Ogni numero intero maggiore di 1 può essere scritto in modo unico come prodotto di numeri primi",
    punteggio: 500,
    mostrata: 0,
    spiegazione: "Il teorema fondamentale dell'aritmetica afferma che ogni numero intero maggiore di 1 ha una scomposizione in fattori primi unica, a meno dell'ordine."
  },
  {
    categoria: "Matematica",
    domanda: "Quale proprietà deve avere una matrice quadrata affinché sia invertibile?",
    risposte: [
      "Il determinante deve essere diverso da zero",
      "Deve essere simmetrica",
      "Deve avere lo stesso numero di righe e colonne",
      "Deve essere composta solo da numeri interi"
    ],
    corretta: "Il determinante deve essere diverso da zero",
    punteggio: 500,
    mostrata: 0,
    spiegazione: "Una matrice quadrata è invertibile se e solo se il suo determinante è diverso da zero."
  },
  {
    categoria: "Matematica",
    domanda: "Quale concetto matematico viene usato per descrivere la rapidità con cui una funzione cresce all'infinito?",
    risposte: [
      "Notazione Big-O",
      "Teorema di Lagrange",
      "Numero di Eulero",
      "Derivata seconda"
    ],
    corretta: "Notazione Big-O",
    punteggio: 500,
    mostrata: 0,
    spiegazione: "La notazione Big-O viene utilizzata in matematica e informatica per descrivere il limite superiore della crescita di una funzione."
  },
  {
    categoria: "Matematica",
    domanda: "Quale sequenza numerica inizia con 1, 3, 6, 10, 15, 21, ...?",
    risposte: [
      "Numeri triangolari",
      "Successione di Fibonacci",
      "Numeri primi",
      "Numeri perfetti"
    ],
    corretta: "Numeri triangolari",
    punteggio: 500,
    mostrata: 0,
    spiegazione: "I numeri triangolari si ottengono sommando i primi n numeri naturali: 1, 3 (1+2), 6 (1+2+3), ecc."
  },
  {
    categoria: "Matematica",
    domanda: "Se un numero è congruo a 1 modulo 4, quale proprietà potrebbe avere?",
    risposte: [
      "Può essere espresso come somma di due quadrati",
      "È sempre un numero primo",
      "È sempre un numero pari",
      "Non può essere espresso come somma di due quadrati"
    ],
    corretta: "Può essere espresso come somma di due quadrati",
    punteggio: 500,
    mostrata: 0,
    spiegazione: "Un numero della forma 4k+1 può essere scritto come somma di due quadrati, secondo il teorema di Fermat sulle somme di quadrati."
  },

  // 📌 DOMANDE DI PRATICA (4)
  {
    categoria: "Matematica",
    domanda: "Qual è la somma di tutti i numeri interi da 1 a 100?",
    risposte: ["5050", "5000", "4950", "5100"],
    corretta: "5050",
    punteggio: 500,
    mostrata: 0,
    spiegazione: "La somma dei primi n numeri naturali è data dalla formula n(n+1)/2. Con n=100: (100 × 101)/2 = 5050."
  },
  {
    categoria: "Matematica",
    domanda: "Un rettangolo ha un'area di 48 cm² e una base di 8 cm. Quanto misura la sua altezza?",
    risposte: ["6 cm", "8 cm", "4 cm", "12 cm"],
    corretta: "6 cm",
    punteggio: 500,
    mostrata: 0,
    spiegazione: "L'area del rettangolo si calcola come base × altezza. Invertendo la formula: altezza = area / base = 48 / 8 = 6 cm."
  },
  {
    categoria: "Matematica",
    domanda: "Se il 40% di un numero è 80, qual è il numero originale?",
    risposte: ["200", "160", "100", "120"],
    corretta: "200",
    punteggio: 500,
    mostrata: 0,
    spiegazione: "Il 40% di un numero x è 80, quindi 0,4x = 80. Risolvendo: x = 80 / 0,4 = 200."
  },
  {
    categoria: "Matematica",
    domanda: "Un'equazione di terzo grado ha al massimo quanti zeri reali?",
    risposte: ["3", "2", "1", "4"],
    corretta: "3",
    punteggio: 500,
    mostrata: 0,
    spiegazione: "Un'equazione polinomiale di grado n ha al massimo n soluzioni reali. Per un'equazione di terzo grado, il massimo è 3."
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