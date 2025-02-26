import { useState } from "react";
import QuizGrid from "./components/QuizGrid";
import PlayerBox from "./components/PlayerBox";
import GameSetupPopup from "./components/GameSetupPopup";

function App() {
  const [scores, setScores] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [numPlayers, setNumPlayers] = useState(3);
  const [categories, setCategories] = useState([]);

  // Funzione per avviare il gioco con il numero corretto di giocatori
  const startGame = (players, selectedCategories) => {
    setNumPlayers(players);
    setCategories(selectedCategories);
    setScores(new Array(players).fill(0)); // Inizializza i punteggi
    setGameStarted(true);
  };

  // Trova il leader (chi ha il punteggio massimo)
  const maxScore = Math.max(...scores);
  const minScore = Math.min(...scores);
  const leaderIndex = scores.indexOf(maxScore) === scores.lastIndexOf(maxScore) ? scores.indexOf(maxScore) : -1;
  const worstIndex = scores.indexOf(minScore) === scores.lastIndexOf(minScore) ? scores.indexOf(minScore) : -1;

  return (
    <div className="w-screen h-screen flex flex-col">
      {/* Popup iniziale */}
      {!gameStarted && <GameSetupPopup onStartGame={startGame} />}

      {/* Griglia */}
      <div className="flex-grow overflow-hidden">
        <QuizGrid />
      </div>

      {/* Footer con giocatori dinamici */}
      <footer className="w-full bg-gray-100 p-2 sm:p-4 flex flex-wrap justify-center gap-4 border-t shadow-md">
        {scores.map((score, index) => (
          <PlayerBox
            key={index}
            score={score}
            isLeader={index === leaderIndex}
            isWorst={index === worstIndex}
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