import React from "react";

const categories = ["Storia", "Scienza", "Geografia", "Sport", "Cultura"];
const points = [100, 200, 300, 400, 500];

// Variabile per la classe delle celle per evitare ripetizioni
const cellStyles = `
  bg-gradient-to-b from-blue-600 to-blue-800 text-white text-center font-bold cursor-pointer 
  border border-blue-500 text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl 
  flex items-center justify-center h-full w-full rounded-xl 
  shadow-[0px_6px_0px_0px_rgba(0,0,0,0.4)] transition-all duration-300 ease-in-out 
  hover:shadow-[0px_12px_0px_0px_rgba(0,0,0,0.6)] hover:translate-y-[-4px] 
  active:shadow-[0px_3px_0px_0px_rgba(0,0,0,0.3)] active:translate-y-[2px]
`;

const QuizGrid = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-blue-700">
      {/* Griglia principale con meno spazio tra le celle */}
      <div className="grid grid-cols-5 grid-rows-[0.5fr_1fr_1fr_1fr_1fr_1fr] w-full h-full gap-1 p-2">
        
        {/* Intestazioni delle categorie */}
        {categories.map((category, index) => (
          <div
            key={`category-${index}`}
            className="bg-gradient-to-b from-blue-500 to-blue-700 text-white text-center font-bold uppercase border border-blue-300 
              text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl 
              flex items-center justify-center h-full w-full 
              rounded-xl shadow-lg"
          >
            {category}
          </div>
        ))}

        {/* Celle con i punti (stile mattoni in rilievo) */}
        {points.map((point) =>
          categories.map((_, index) => (
            <div key={`cell-${index}-${point}`} className={cellStyles}>
              {point}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default QuizGrid;