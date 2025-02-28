import { db } from "./firebaseConfig.js";
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";

const deleteMathQuestions = async () => {
  try {
    // 1️⃣ Creiamo una query per trovare tutte le domande di una categoria
    const q = query(collection(db, "domande"), where("categoria", "==", "Matematica"), where("punteggio", "==", 300));
    const querySnapshot = await getDocs(q);

    // 2️⃣ Cancella ogni documento trovato
    for (const document of querySnapshot.docs) {
      await deleteDoc(doc(db, "domande", document.id));
      console.log(`❌ Eliminata domanda: ${document.data().domanda}`);
    }

    console.log("✅ Tutte le domande di Matematica sono state eliminate con successo!");
  } catch (error) {
    console.error("❌ Errore durante la cancellazione:", error);
  }
};

// 3️⃣ Esegui la funzione
deleteMathQuestions();