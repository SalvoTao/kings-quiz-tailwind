import React, { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../database/firebaseConfig";

const QuizGrid = ({ onCellClick, selectedCategories }) => {
  const [questions, setQuestions] = useState({});
  const [categories, setCategories] = useState([]);
  const [answeredCells, setAnsweredCells] = useState(new Set());
  const [completedCategories, setCompletedCategories] = useState(new Set()); // Stato per monitorare categorie completate

  // Punteggi delle domande
  const pointValues = [100, 200, 300, 400, 500];

  useEffect(() => {
    const fetchQuestions = async () => {
      if (!selectedCategories || selectedCategories.length === 0) return;

      let loadedQuestions = {};
      for (let category of selectedCategories) {
        const q = query(collection(db, "domande"), where("categoria", "==", category));
        const querySnapshot = await getDocs(q);
        let categoryQuestions = querySnapshot.docs.map(doc => doc.data());

        loadedQuestions[category] = {};
        pointValues.forEach((points) => {
          loadedQuestions[category][points] = categoryQuestions.filter(q => q.punteggio === points);
        });
      }
      setQuestions(loadedQuestions);
    };

    // Seleziona 5 categorie casuali tra quelle scelte
    if (selectedCategories.length > 5) {
      const shuffled = [...selectedCategories].sort(() => Math.random() - 0.5);
      setCategories(shuffled.slice(0, 5));
    } else {
      setCategories(selectedCategories);
    }

    fetchQuestions();
  }, [selectedCategories]);

  // Funzione per gestire il click su una cella
  const handleCellClick = (category, points) => {
    const cellKey = `${category}-${points}`;
    
    // Se la cella è già stata risolta, non fare nulla
    if (answeredCells.has(cellKey)) return;

    const questionList = questions[category]?.[points] || [];
    const randomQuestion = questionList.length > 0 ? questionList[Math.floor(Math.random() * questionList.length)] : null;

    if (randomQuestion) {
      onCellClick(randomQuestion);
      
      // Dopo aver selezionato una domanda, la cella viene contrassegnata come risolta
      setAnsweredCells((prev) => {
        const newAnsweredCells = new Set(prev);
        newAnsweredCells.add(cellKey);

        // Controlla se tutte le celle della colonna sono state risolte
        const categoryCells = pointValues.map((p) => `${category}-${p}`);
        const isCategoryCompleted = categoryCells.every((key) => newAnsweredCells.has(key));

        if (isCategoryCompleted) {
          setCompletedCategories((prevCompleted) => new Set(prevCompleted).add(category));
        }

        return newAnsweredCells;
      });
    }
  };

  return (
    <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-blue-900 to-blue-700">
      <div className="grid grid-cols-5 w-full h-full gap-1 p-2"
           style={{ gridTemplateRows: "1fr 2fr 2fr 2fr 2fr 2fr" }}> 

        {/* Intestazione delle categorie */}
        {categories.map((category, index) => {
          const isCompleted = completedCategories.has(category);

          return (
            <div
              key={`category-${index}`}
              className={`relative text-white text-center uppercase border border-blue-300 
                text-lg sm:text-xl md:text-2xl flex items-center justify-center h-full w-full 
                rounded-xl shadow-lg tracking-wider font-semibold transition-all duration-300
                ${isCompleted
                  ? "bg-blue-950 text-gray-500 border-gray-600 shadow-inner" // Effetto spento per categorie completate
                  : "bg-gradient-to-b from-blue-600 to-blue-800"
                }`}
            >
              <span className="relative z-10 drop-shadow-lg">{category}</span>
              {!isCompleted && (
                <div className="absolute inset-0 rounded-xl animate-pulse bg-[radial-gradient(circle,rgba(255,255,255,0.2)_10%,transparent_60%)]"></div>
              )}
            </div>
          );
        })}

        {/* Celle con i punteggi */}
        {pointValues.map((point) =>
          categories.map((category, colIndex) => {
            const cellKey = `${category}-${point}`;
            const isAnswered = answeredCells.has(cellKey);

            return (
              <div
                key={`cell-${colIndex}-${point}`}
                className={`text-white text-center border border-blue-500 text-lg sm:text-xl md:text-2xl 
                flex items-center justify-center h-full w-full rounded-xl transition-all duration-300 
                ${isAnswered
                  ? "bg-blue-950 text-gray-500 border-gray-600 shadow-inner" // Effetto scavato per celle risolte
                  : "cursor-pointer bg-gradient-to-b from-blue-600 to-blue-800 hover:shadow-[0px_6px_0px_0px_rgba(0,0,0,0.4)] hover:translate-y-[-4px] active:shadow-[0px_3px_0px_0px_rgba(0,0,0,0.3)] active:translate-y-[2px]"
                }`}
                onClick={() => handleCellClick(category, point)}
              >
                {point}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default QuizGrid;