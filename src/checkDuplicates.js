import { db } from "./firebaseConfig.js";
import { collection, getDocs } from "firebase/firestore";

// Funzione per verificare domande duplicate
const checkForDuplicates = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "domande"));

    let questionsMap = new Map(); // Mappa per tracciare domande e i loro dettagli
    let duplicates = new Map(); // Mappa per raccogliere i duplicati trovati

    // Raccogli tutte le domande
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const questionText = data.domanda.trim().toLowerCase(); // Normalizzazione testo domanda
      const record = {
        id: doc.id,
        punteggio: data.punteggio,
        categoria: data.categoria
      };

      if (questionsMap.has(questionText)) {
        // Se esiste già la domanda, aggiungila ai duplicati
        if (!duplicates.has(questionText)) {
          duplicates.set(questionText, [questionsMap.get(questionText)]); // Aggiungi il primo elemento già salvato
        }
        duplicates.get(questionText).push(record);
      } else {
        // Se è la prima volta che vediamo questa domanda, la salviamo
        questionsMap.set(questionText, record);
      }
    });

    // Stampa i risultati
    if (duplicates.size > 0) {
      console.log("🔴 ATTENZIONE! Sono state trovate domande duplicate:");
      duplicates.forEach((records, question) => {
        console.log(`\n🔍 Domanda: "${question}"`);
        records.forEach((rec) =>
          console.log(`   ➤ ID: ${rec.id} | Categoria: ${rec.categoria} | Punteggio: ${rec.punteggio}`)
        );
      });
    } else {
      console.log("✅ Nessuna domanda duplicata trovata!");
    }
  } catch (error) {
    console.error("❌ Errore durante il controllo dei duplicati:", error);
  }
};

// Esegui il controllo
checkForDuplicates();