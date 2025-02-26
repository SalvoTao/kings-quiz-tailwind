import React from "react";

const categories = ["Storia", "Scienza", "Geografia", "Sport", "Cultura"];
const points = [100, 200, 300, 400, 500];
const questions = {
  "Storia": ["Chi ha scoperto l'America?", "Quando è caduto l'Impero Romano?", "Quale guerra iniziò nel 1914?", "Chi era Napoleone?", "In che anno finì la Seconda Guerra Mondiale?"],
  "Scienza": ["Qual è la formula dell'acqua?", "Chi ha sviluppato la teoria della relatività?", "Cosa misura un termometro?", "Qual è il pianeta più vicino al sole?", "Cosa fa la fotosintesi?"],
  "Geografia": ["Qual è la capitale della Francia?", "Dove si trova il deserto del Sahara?", "Qual è il fiume più lungo del mondo?", "Quanti continenti esistono?", "Dove si trovano le Alpi?"],
  "Sport": ["Chi ha vinto i Mondiali 2018?", "Quanti giocatori ha una squadra di calcio?", "Quale sport si gioca con una racchetta e una pallina?", "Chi è il recordman dei 100 metri?", "In quale sport si usa un guantone?"],
  "Cultura": ["Chi ha scritto La Divina Commedia?", "Qual è la lingua più parlata al mondo?", "Chi ha dipinto la Gioconda?", "Dove si trova la Torre di Pisa?", "Chi ha composto la Nona Sinfonia?"],
};

const QuizGrid = ({ onCellClick }) => {
  return (
    <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-blue-900 to-blue-700">
      <div className="grid grid-cols-5 grid-rows-[0.5fr_1fr_1fr_1fr_1fr_1fr] w-full h-full gap-1 p-2">
        {categories.map((category, index) => (
          <div
            key={`category-${index}`}
            className="bg-gradient-to-b from-blue-500 to-blue-700 text-white text-center font-bold uppercase border border-blue-300 flex items-center justify-center h-full w-full rounded-xl shadow-lg"
          >
            {category}
          </div>
        ))}

        {points.map((point, rowIndex) =>
          categories.map((category, colIndex) => (
            <div
              key={`cell-${colIndex}-${rowIndex}`}
              className="bg-gradient-to-b from-blue-600 to-blue-800 text-white text-center font-bold cursor-pointer border border-blue-500 flex items-center justify-center h-full w-full rounded-xl shadow-lg transition-all hover:scale-105"
              onClick={() => onCellClick(questions[category][rowIndex])}
            >
              {point}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default QuizGrid;