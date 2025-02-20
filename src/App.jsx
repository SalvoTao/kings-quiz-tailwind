import React, { useState } from "react";
import QuizGrid from "./components/QuizGrid";
import PlayerBox from "./components/PlayerBox";

function App() {
  const [scores, setScores] = useState([0, 0, 0]); // Stato per i punteggi di ogni giocatore

  // Trova il punteggio massimo tra i giocatori
  const maxScore = Math.max(...scores);

  // Contiamo quanti giocatori hanno il punteggio massimo
  const countMaxScores = scores.filter(score => score === maxScore).length;

  // Funzione per aggiornare i punteggi
  const updateScore = (index, newScore) => {
    const updatedScores = [...scores];
    updatedScores[index] = newScore;
    setScores(updatedScores);
  };

  return (
    <div className="w-screen h-screen flex flex-col">
      {/* Griglia */}
      <div className="flex-grow overflow-hidden">
        <QuizGrid />
      </div>

      {/* Footer con giocatori */}
      <footer 
        className={`w-full bg-gray-100 p-2 sm:p-4 flex flex-wrap justify-center gap-4 border-t shadow-md transition-all duration-200
                   ${countMaxScores === 1 ? "gap-5 sm:gap-6 md:gap-7" : "gap-4"}`} // Spazio leggermente ridotto rispetto a prima
      >
        {scores.map((score, index) => (
          <PlayerBox 
            key={index} 
            score={score} 
            isLeader={countMaxScores === 1 && score === maxScore} 
            updateScore={(newScore) => updateScore(index, newScore)}
          />
        ))}
      </footer>
    </div>
  );
}

export default App;