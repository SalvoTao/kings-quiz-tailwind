import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebaseConfig.js";

// Modifica questa variabile per scegliere la categoria da controllare
const CATEGORIA_DA_CONTROLLARE = "Matematica"; // Cambia con la categoria desiderata

const checkDuplicateAnswers = async () => {
  // Esegue la query solo per la categoria specificata
  const q = query(collection(db, "domande"), where("categoria", "==", CATEGORIA_DA_CONTROLLARE));
  const querySnapshot = await getDocs(q);
  
  const questions = querySnapshot.docs.map(doc => ({
    id: doc.id,
    categoria: doc.data().categoria,
    domanda: doc.data().domanda,
    rispostaCorretta: doc.data().corretta,
    punteggio: doc.data().punteggio
  }));

  let answerMap = new Map();
  let duplicates = [];

  questions.forEach(question => {
    let answer = question.rispostaCorretta;

    // Verifica che la risposta sia una stringa, altrimenti la converte (se è un array, la unisce)
    if (Array.isArray(answer)) {
      answer = answer.join(", ").toLowerCase();
    } else if (typeof answer === "string") {
      answer = answer.toLowerCase();
    } else {
      return;
    }

    if (answerMap.has(answer)) {
      answerMap.get(answer).push(question);
    } else {
      answerMap.set(answer, [question]);
    }
  });

  // Cerca le risposte duplicate
  answerMap.forEach((questionsWithSameAnswer, answer) => {
    if (questionsWithSameAnswer.length > 1) {
      duplicates.push({ answer, questions: questionsWithSameAnswer });
    }
  });

  console.log(`📌 Controllo duplicati per la categoria: ${CATEGORIA_DA_CONTROLLARE}`);

  if (duplicates.length > 0) {
    console.log(`🔴 ATTENZIONE! Sono state trovate risposte duplicate in "${CATEGORIA_DA_CONTROLLARE}":\n`);

    duplicates.forEach(dup => {
      console.log(`🔍 Risposta: "${dup.answer}"`);
      dup.questions.forEach(q => {
        console.log(`   ➤ ID: ${q.id} | Punteggio: ${q.punteggio}`);
        console.log(`   🏆 Domanda: "${q.domanda}"\n`);
      });
    });
  } else {
    console.log(`✅ Nessuna risposta duplicata trovata per la categoria "${CATEGORIA_DA_CONTROLLARE}".`);
  }
};

// Esegui lo script
checkDuplicateAnswers();