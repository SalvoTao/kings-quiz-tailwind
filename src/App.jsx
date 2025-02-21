import { useEffect, useRef, useState } from "react";
import QuizGrid from "./components/QuizGrid";
import PlayerBox from "./components/PlayerBox";
import GameSetupPopup from "./components/GameSetupPopup";

function App() {
  const [scores, setScores] = useState([0, 0, 0]);
  const [gameStarted, setGameStarted] = useState(false);
  const [numPlayers, setNumPlayers] = useState(3);
  const [categories, setCategories] = useState([]);
  const [musicVolume, setMusicVolume] = useState(0.5); // Volume iniziale
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const musicRef = useRef(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Funzione per avviare il gioco
  const startGame = (players, selectedCategories) => {
    setNumPlayers(players);
    setCategories(selectedCategories);
    setScores(new Array(players).fill(0));
    setGameStarted(true);
    setIsMusicPlaying(true);
  };

  // Effetto per gestire la musica di sottofondo
  useEffect(() => {
    if (!musicRef.current) {
      musicRef.current = new Audio("/sounds/game-music.mp3");
      musicRef.current.loop = true;
    }
    if (isMusicPlaying) {
      musicRef.current.volume = musicVolume;
      musicRef.current.play();
    } else {
      musicRef.current.pause();
    }
  }, [isMusicPlaying, musicVolume]);

  return (
    <div className="w-screen h-screen flex flex-col">
      {/* Popup iniziale */}
      {!gameStarted && <GameSetupPopup onStartGame={startGame} />}

      {/* Icona impostazioni per aprire il menu */}
      {gameStarted && (
        <div className="absolute top-4 right-4">
          <button
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            className="p-3 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 transition-all"
          >
            ⚙️
          </button>

          {/* Menu delle impostazioni */}
          {isSettingsOpen && (
            <div className="absolute right-0 mt-2 bg-black bg-opacity-90 p-4 rounded-lg shadow-lg w-48">
              <h3 className="text-white text-lg font-bold">Impostazioni</h3>

              {/* Controllo del volume */}
              <div className="mt-2">
                <label className="text-white text-sm">Volume 🎵</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={musicVolume}
                  onChange={(e) => setMusicVolume(parseFloat(e.target.value))}
                  className="w-full cursor-pointer mt-1"
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Griglia */}
      <div className="flex-grow overflow-hidden">
        <QuizGrid />
      </div>

      {/* Footer con giocatori */}
      <footer className="w-full bg-gray-100 p-2 sm:p-4 flex flex-wrap justify-center gap-4 border-t shadow-md">
        {scores.map((score, index) => (
          <PlayerBox
            key={index}
            score={score}
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