import React, { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../database/firebaseConfig";

const QuizGrid = ({ onCellClick, selectedCategories }) => {
  const [questions, setQuestions] = useState({});
  const [categories, setCategories] = useState([]);

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

  return (
    <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-blue-900 to-blue-700">
      <div className="grid grid-cols-5 grid-rows-6 w-full h-full gap-1 p-2">

        {/* Intestazione delle categorie */}
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

        {/* Celle con i punteggi */}
        {pointValues.map((point) =>
          categories.map((category, colIndex) => {
            const questionList = questions[category]?.[point] || [];
            const randomQuestion = questionList.length > 0 ? questionList[Math.floor(Math.random() * questionList.length)] : null;

            return (
              <div
                key={`cell-${colIndex}-${point}`}
                className="bg-gradient-to-b from-blue-600 to-blue-800 text-white text-center font-bold cursor-pointer 
                border border-blue-500 text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl 
                flex items-center justify-center h-full w-full rounded-xl 
                shadow-[0px_6px_0px_0px_rgba(0,0,0,0.4)] transition-all duration-300 ease-in-out 
                hover:shadow-[0px_12px_0px_0px_rgba(0,0,0,0.6)] hover:translate-y-[-4px] 
                active:shadow-[0px_3px_0px_0px_rgba(0,0,0,0.3)] active:translate-y-[2px]"
                onClick={() => {
                  if (randomQuestion) {
                    console.log("📌 Domanda selezionata:", randomQuestion);
                    onCellClick(randomQuestion);
                  } else {
                    console.warn(`⚠️ Nessuna domanda disponibile per ${category} con punteggio ${point}`);
                  }
                }}
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