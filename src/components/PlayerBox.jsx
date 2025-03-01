import React, { useState, useEffect, useRef } from "react";

const MAX_NAME_LENGTH = 40; // Numero massimo di caratteri consentiti

const PlayerBox = ({ score, isLeader, isActive }) => {
  const [playerName, setPlayerName] = useState("");
  const [boxWidth, setBoxWidth] = useState(160); // Larghezza minima del box
  const spanRef = useRef(null);

  useEffect(() => {
    if (spanRef.current) {
      const textWidth = spanRef.current.offsetWidth;
      setBoxWidth(Math.max(160, textWidth + 50)); // Mantiene il box responsive
    }
  }, [playerName]);

  const handleChange = (e) => {
    if (e.target.value.length <= MAX_NAME_LENGTH) {
      setPlayerName(e.target.value);
    }
  };

  return (
    <div 
      className={`relative flex flex-col items-center p-4 rounded-xl shadow-md transition-all duration-150
                  border ${
                    isLeader && isActive
                      ? "border-yellow-400 shadow-[0px_0px_15px_3px_rgba(255,215,0,0.6),0px_0px_15px_4px_rgba(0,255,0,0.6)] scale-110"
                      : isLeader
                      ? "border-yellow-400 shadow-[0px_0px_12px_3px_rgba(255,215,0,0.6)] scale-105"
                      : isActive
                      ? "border-green-400 shadow-[0px_0px_15px_rgba(0,255,0,0.6)] scale-105"
                      : "border-gray-300"
                  }`} 
      style={{ width: `${boxWidth}px`, minWidth: "180px", margin: "10px" }} // Spazio costante tra i box
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

      {/* Barra luminosa sotto il nome per il turno attivo */}
      {isActive && (
        <div className="absolute -bottom-2 w-[80%] h-1.5 bg-green-400 rounded-full shadow-[0px_0px_8px_rgba(0,255,0,0.8)]"></div>
      )}

      {/* Punteggio senza grassetto */}
      <div className={`mt-2 text-xl sm:text-2xl ${score < 0 ? "text-red-600" : "text-blue-700"}`}>
        {score}
      </div>
    </div>
  );
};

export default PlayerBox;