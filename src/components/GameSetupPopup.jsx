import React, { useState } from "react";

const GameSetupPopup = ({ onStartGame }) => {
  const [numPlayers, setNumPlayers] = useState(2);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const minCategories = 5;

  const categories = [
    "Sport", "Scienza", "Geografia", "Storia", "Cinema",
    "Musica", "Tecnologia", "Matematica", "Astronomia",
    "Anime/Manga", "YouTube", "Twitch"
  ];

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const increasePlayers = () => {
    if (numPlayers < 5) setNumPlayers(numPlayers + 1);
  };

  const decreasePlayers = () => {
    if (numPlayers > 2) setNumPlayers(numPlayers - 1);
  };

  const isError = selectedCategories.length < minCategories;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-md z-50">
      <div className="relative bg-blue-900 p-8 rounded-2xl shadow-[0_0_20px_rgba(255,215,0,0.8)] w-[90%] max-w-4xl text-center border-4 border-yellow-400">

        {/* LOGO - Centrato con animazione senza spostamenti */}
        <div className="absolute top-[-140px] left-1/2 transform -translate-x-1/2 flex items-center justify-center">
          <img
            src="/images/kings-quiz-logo.png"
            alt="Kings Quiz Logo"
            className="w-60 drop-shadow-lg animate-bounceSlow"
          />
        </div>



        {/* Selezione numero di giocatori */}
        <h2 className="text-2xl font-extrabold text-white uppercase tracking-wide mt-12">Seleziona il numero di giocatori:</h2>
        <div className="flex items-center justify-center mt-4 space-x-4">
          <button
            onClick={decreasePlayers}
            disabled={numPlayers === 2}
            className={`w-12 h-12 text-2xl font-bold rounded-lg shadow-lg transition-all 
                      ${numPlayers === 2
                ? "bg-transparent text-gray-500 border border-gray-600 cursor-not-allowed shadow-none"
                : "bg-yellow-400 text-black hover:bg-yellow-300 active:translate-y-1"}`}
          >
            -
          </button>

          {/* Display del numero di giocatori */}
          <div className="w-16 h-12 flex items-center justify-center text-2xl font-bold text-white border-2 border-yellow-400 bg-blue-800 rounded-lg shadow-inner">
            {numPlayers}
          </div>

          <button
            onClick={increasePlayers}
            disabled={numPlayers === 5}
            className={`w-12 h-12 text-2xl font-bold rounded-lg shadow-lg transition-all 
                      ${numPlayers === 5
                ? "bg-transparent text-gray-500 border border-gray-600 cursor-not-allowed shadow-none"
                : "bg-yellow-400 text-black hover:bg-yellow-300 active:translate-y-1"}`}
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
                ${selectedCategories.includes(category)
                  ? "bg-gradient-to-b from-yellow-300 to-yellow-500 text-black shadow-[0_0_15px_rgba(255,255,255,0.8)] border-2 border-white animate-glow"
                  : "bg-gradient-to-b from-blue-500 to-blue-700 text-white hover:shadow-[0_0_12px_rgba(255,255,255,0.5)] hover:scale-105 transition-transform"
                }`}
              onClick={() => toggleCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Messaggio delle categorie */}
        <div className={`mt-4 p-2 font-semibold rounded-lg shadow-md flex justify-center items-center w-4/5 max-w-lg mx-auto text-sm transition-all ${isError ? "bg-red-500 text-white" : "bg-green-500 text-white"
          }`}>
          <span className="text-center text-[12px]">
            {isError
              ? `Seleziona almeno ${minCategories} categorie per iniziare!`
              : "Tutte le categorie selezionate correttamente! 🎉"}
          </span>
          <div className="ml-2 flex items-center relative group">
            <div className={`w-5 h-5 flex items-center justify-center text-[10px] text-white 
                            rounded-md shadow-inner border border-gray-700 
                            cursor-pointer transition ${isError ? "bg-red-700" : "bg-green-700"
              }`}>
              ❔
            </div>
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 hidden group-hover:flex w-60 bg-gray-800 bg-opacity-90 text-white text-[12px] p-2 rounded-md shadow-xl border border-gray-600 transition-opacity">
              <span className="text-center">Tra tutte le categorie scelte, solo 5 verranno selezionate in modo casuale.</span>
              <div className="w-2.5 h-2.5 bg-gray-800 border border-gray-600 rotate-45 absolute bottom-[-4px] left-1/2 transform -translate-x-1/2"></div>
            </div>
          </div>
        </div>

        {/* Pulsante per iniziare il gioco */}
        <button
          onClick={() => onStartGame(numPlayers, selectedCategories)}
          disabled={isError}
          className={`mt-10 px-8 py-3 text-xl font-bold uppercase rounded-lg shadow-lg transition-all
            ${isError
              ? "bg-transparent text-gray-400 border border-gray-500 cursor-not-allowed shadow-none"
              : "bg-green-500 text-white hover:bg-green-400 active:translate-y-1 shadow-[inset_0_-4px_8px_rgba(0,0,0,0.4)]"
            }`}
        >
          INIZIA IL GIOCO
        </button>

        {/* Copyright */}
        <p className="text-gray-400 text-sm mt-2">© 2025 Kings Quiz | Versione 1.0.0</p>
      </div>
    </div>
  );
};

export default GameSetupPopup;