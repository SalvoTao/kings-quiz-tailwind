import React, { useState, useEffect, useRef } from "react";

const MAX_NAME_LENGTH = 40; // Numero massimo di caratteri consentiti

const PlayerBox = ({ score, isLeader, updateScore }) => {
  const [playerName, setPlayerName] = useState("");
  const [boxWidth, setBoxWidth] = useState(160); // Larghezza minima del box
  const spanRef = useRef(null);

  useEffect(() => {
    if (spanRef.current) {
      const textWidth = spanRef.current.offsetWidth;
      setBoxWidth(Math.max(160, textWidth + 50)); // Evita che il testo esca dal box
    }
  }, [playerName]);

  const handleChange = (e) => {
    if (e.target.value.length <= MAX_NAME_LENGTH) {
      setPlayerName(e.target.value);
    }
  };

  const increaseScore = () => updateScore(score + 100);
  const decreaseScore = () => updateScore(score - 100);

  return (
    <div 
      className={`relative flex flex-col items-center p-4 bg-white rounded-xl shadow-md transition-all duration-150 
                  border ${isLeader ? "border-yellow-400 shadow-[0px_0px_12px_3px_rgba(255,215,0,0.6)] scale-105" : "border-gray-300"}
                  hover:shadow-lg hover:scale-103`} 
      style={{ width: `${boxWidth}px` }} // Larghezza dinamica
    >
      {/* Mostra la corona sopra la box se il giocatore è il leader */}
      {isLeader && (
        <div className="absolute -top-7 flex items-center justify-center animate-bounce">
          <span className="text-3xl sm:text-4xl drop-shadow-lg">👑</span>
        </div>
      )}

      {/* Input per il nome con limite di caratteri */}
      <input
        type="text"
        placeholder="Nome giocatore"
        value={playerName}
        onInput={handleChange}
        className="text-center text-lg font-semibold p-1 bg-transparent border-b-2 border-gray-400 
                   focus:outline-none focus:border-blue-600 transition-all duration-200 w-full"
      />

      {/* Elemento invisibile per calcolare la larghezza del testo */}
      <span ref={spanRef} className="absolute invisible whitespace-nowrap text-lg font-semibold">
        {playerName || "Nome giocatore"}
      </span>

      {/* Sezione punteggio con pulsanti */}
      <div className="mt-2 flex items-center justify-center w-full gap-4">
        
        {/* Bottone per diminuire il punteggio */}
        <button 
          onClick={decreaseScore} 
          className="text-white bg-blue-700 hover:bg-blue-800 transition-all duration-200 
                     rounded-lg w-10 h-10 text-lg font-bold flex items-center justify-center
                     shadow-[0px_4px_0px_rgba(0,0,0,0.3)] active:shadow-[0px_2px_0px_rgba(0,0,0,0.3)] 
                     active:translate-y-1"
        >
          -
        </button>

        {/* Punteggio */}
        <div className={`text-xl sm:text-2xl font-bold ${score < 0 ? "text-red-600" : "text-blue-700"}`}>
          {score}
        </div>

        {/* Bottone per aumentare il punteggio */}
        <button 
          onClick={increaseScore} 
          className="text-white bg-blue-700 hover:bg-blue-800 transition-all duration-200 
                     rounded-lg w-10 h-10 text-lg font-bold flex items-center justify-center
                     shadow-[0px_4px_0px_rgba(0,0,0,0.3)] active:shadow-[0px_2px_0px_rgba(0,0,0,0.3)] 
                     active:translate-y-1"
        >
          +
        </button>

      </div>
    </div>
  );
};

export default PlayerBox;