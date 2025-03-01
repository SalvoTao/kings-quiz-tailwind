import { useState } from "react";
import QuizGrid from "./components/QuizGrid";
import PlayerBox from "./components/PlayerBox";
import GameSetupPopup from "./components/GameSetupPopup";
import QuestionPopup from "./components/QuestionPopup";

function App() {
  const [scores, setScores] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [numPlayers, setNumPlayers] = useState(3);
  const [categories, setCategories] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState(0); // Indice del giocatore attuale

  // Funzione per avviare il gioco con il numero corretto di giocatori
  const startGame = (players, selectedCategories) => {
    setNumPlayers(players);
    setCategories(selectedCategories);
    setScores(new Array(players).fill(0)); // Inizializza i punteggi
    setGameStarted(true);
  };

  // Funzione per aggiornare il punteggio in base alla risposta
  const handleAnswer = (isCorrect) => {
    setScores((prevScores) => {
      const updatedScores = [...prevScores];
      const points = selectedQuestion.punteggio;
      
      // Aggiunge o rimuove i punti in base alla risposta
      updatedScores[currentPlayer] += isCorrect ? points : -points;

      return updatedScores;
    });

    setSelectedQuestion(null); // Chiude il popup dopo la risposta
    setCurrentPlayer((prev) => (prev + 1) % numPlayers); // Passa al prossimo giocatore
  };

  // Trova il leader (chi ha il punteggio massimo)
  const maxScore = Math.max(...scores);
  const leaderIndex = scores.indexOf(maxScore) === scores.lastIndexOf(maxScore) ? scores.indexOf(maxScore) : -1;

  return (
    <div className="w-screen h-screen flex flex-col">
      {/* Popup iniziale */}
      {!gameStarted && <GameSetupPopup onStartGame={startGame} />}

      {/* Griglia */}
      <div className="flex-grow overflow-hidden">
        <QuizGrid onCellClick={setSelectedQuestion} selectedCategories={categories} />
      </div>

      {/* Popup della domanda */}
      {selectedQuestion && <QuestionPopup question={selectedQuestion} onAnswer={handleAnswer} />}

      {/* Footer con giocatori dinamici */}
      <footer className="w-full bg-gray-100 p-2 sm:p-4 flex flex-wrap justify-center gap-4 border-t shadow-md">
        {scores.map((score, index) => (
          <PlayerBox
            key={index}
            score={score}
            isLeader={index === leaderIndex}
            updateScore={(newScore) => {
              const updatedScores = [...scores];
              updatedScores[index] = newScore;
              setScores(updatedScores);
            }}
          />
        ))}
      </footer>
    </div>
  );
}

export default App;