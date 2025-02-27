import { db } from "./firebaseConfig.js";
import { collection, getDocs } from "firebase/firestore";

// Funzione per contare le domande per categoria e punteggio
const countQuestions = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "domande"));

    let categoryCount = {}; // Oggetto per memorizzare il conteggio

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const category = data.categoria;
      const score = data.punteggio;

      // Inizializza la categoria se non esiste ancora
      if (!categoryCount[category]) {
        categoryCount[category] = { total: 0 };
      }

      // Inizializza il punteggio se non esiste
      if (!categoryCount[category][score]) {
        categoryCount[category][score] = 0;
      }

      // Incrementa i conteggi
      categoryCount[category][score]++;
      categoryCount[category].total++;
    });

    // Stampa i risultati
    console.log("📊 Conteggio delle domande per categoria e punteggio:");
    Object.keys(categoryCount).forEach((category) => {
      console.log(`\n📌 Categoria: ${category} (Totale: ${categoryCount[category].total} domande)`);
      Object.keys(categoryCount[category])
        .filter(key => key !== "total") // Escludi il totale dalla lista dei punteggi
        .sort((a, b) => a - b) // Ordina i punteggi in ordine crescente
        .forEach((score) => {
          console.log(`   ➤ Punteggio ${score}: ${categoryCount[category][score]} domande`);
        });
    });

  } catch (error) {
    console.error("❌ Errore durante il conteggio delle domande:", error);
  }
};

// Esegui il conteggio
countQuestions();