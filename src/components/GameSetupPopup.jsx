import React, { useState } from "react";

const GameSetupPopup = ({ onStartGame }) => {
  const [numPlayers, setNumPlayers] = useState(2);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const minCategories = 5;

  const categories = [
    "Sport", "Scienza", "Geografia", "Storia", "Cinema", 
    "Musica", "Letteratura", "Tecnologia", "Matematica", "Astronomia",
    "Anime/Manga", "YouTube", "Twitch", "Geometria"
  ];

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const increasePlayers = () => {
    if (numPlayers < 6) setNumPlayers(numPlayers + 1);
  };

  const decreasePlayers = () => {
    if (numPlayers > 2) setNumPlayers(numPlayers - 1);
  };

  const isError = selectedCategories.length < minCategories;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-md z-50">
      <div className="relative bg-blue-900 p-8 rounded-2xl shadow-[0_0_20px_rgba(255,215,0,0.8)] w-[90%] max-w-4xl text-center border-4 border-yellow-400">

        {/* Logo */}
        <div className="mb-4">
          <img src="/logo.png" alt="Kings Quiz Logo" className="w-40 mx-auto drop-shadow-lg" />
        </div>

        {/* Selezione numero di giocatori */}
        <h2 className="text-2xl font-extrabold text-white uppercase tracking-wide">Seleziona il numero di giocatori:</h2>
        <div className="flex items-center justify-center mt-4 space-x-4">
          <button 
            onClick={decreasePlayers} 
            className="w-12 h-12 bg-gray-700 text-white text-2xl font-bold rounded-lg shadow-lg 
                      active:translate-y-1 transition-all hover:bg-gray-600"
          >
            -
          </button>
          <div className="w-16 h-12 flex items-center justify-center text-2xl font-bold text-white border-2 border-yellow-400 bg-blue-800 rounded-lg shadow-inner">
            {numPlayers}
          </div>
          <button 
            onClick={increasePlayers} 
            className="w-12 h-12 bg-yellow-400 text-black text-2xl font-bold rounded-lg shadow-lg 
                      active:translate-y-1 transition-all hover:bg-yellow-300"
          >
            +
          </button>
        </div>

        {/* Selezione categorie */}
        <h3 className="text-xl font-bold text-white mt-6">Scegli le categorie:</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
          {categories.map((category) => (
            <button
              key={category}
              className={`p-3 min-w-[160px] h-14 flex items-center justify-center rounded-lg text-lg font-semibold uppercase transition-all
                shadow-[0px_4px_6px_rgba(0,0,0,0.3)] focus:outline-none relative overflow-hidden
                ${
                  selectedCategories.includes(category)
                    ? "bg-gradient-to-b from-yellow-300 to-yellow-500 text-black shadow-[0_0_15px_rgba(255,255,255,0.8)] border-2 border-white animate-glow"
                    : "bg-gradient-to-b from-blue-500 to-blue-700 text-white"
                }`}
              onClick={() => toggleCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Messaggio con tooltip e icona di aiuto in box scavata, posizionato a destra */}
        <div className={`mt-4 p-2 font-semibold rounded-lg shadow-md flex justify-between items-center transition-all ${
          isError ? "bg-red-500 text-white" : "bg-green-500 text-white"
        }`}>
          <span className="text-center flex-1">
            {isError
              ? `Seleziona almeno ${minCategories} categorie per iniziare!`
              : "Tutte le categorie selezionate correttamente! 🎉"}
          </span>
          
          {/* Icona di Aiuto con Tooltip dentro un box più piccolo con effetto scavato */}
          <div className="relative group flex items-center ml-2">
            <div className={`w-6 h-6 flex items-center justify-center text-sm text-white 
                            rounded-md shadow-inner border border-gray-700 
                            cursor-pointer transition ${
                              isError ? "bg-red-700" : "bg-green-700"
                            }`}>
              ❔
            </div>
            <div className="absolute right-0 bottom-8 hidden group-hover:flex flex-col items-center w-64 bg-gray-900 text-white text-xs p-2 rounded-lg shadow-lg transition-opacity">
              <span className="text-center">Tra tutte le categorie scelte, solo 5 verranno selezionate in modo casuale.</span>
              <div className="w-3 h-3 bg-gray-900 rotate-45 absolute bottom-[-6px] right-2"></div>
            </div>
          </div>
        </div>

        {/* Pulsante per iniziare il gioco */}
        <button
          onClick={() => onStartGame(numPlayers, selectedCategories)}
          disabled={isError}
          className={`mt-4 px-8 py-3 text-xl font-bold uppercase rounded-lg shadow-lg transition-all
            ${
              isError
                ? "bg-transparent text-gray-400 border border-gray-500 cursor-not-allowed shadow-none"
                : "bg-green-500 text-white hover:bg-green-400 active:translate-y-1 shadow-[inset_0_-4px_8px_rgba(0,0,0,0.4)]"
            }`}
        >
          INIZIA IL GIOCO
        </button>

        {/* Copyright - Posizionato senza margine inferiore */}
        <p className="text-gray-400 text-sm mt-2">© 2025 Kings Quiz | Versione 1.0.0</p>
      </div>
      
      {/* Definizione dell'animazione per il glow */}
      <style>
        {`
          @keyframes glow {
            0% { box-shadow: 0 0 8px rgba(255,255,255,0.6), 0 0 15px rgba(255,255,255,0.4); }
            50% { box-shadow: 0 0 12px rgba(255,255,255,1), 0 0 25px rgba(255,255,255,0.8); }
            100% { box-shadow: 0 0 8px rgba(255,255,255,0.6), 0 0 15px rgba(255,255,255,0.4); }
          }
          .animate-glow {
            animation: glow 1s infinite alternate;
          }
        `}
      </style>
    </div>
  );
};

export default GameSetupPopup;