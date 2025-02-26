import React from "react";

const QuestionPopup = ({ question, onClose }) => {
  if (!question) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4 sm:p-8">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-xl max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl w-full text-center border-4 border-yellow-500">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4">Domanda</h2>
        <p className="text-base sm:text-lg md:text-xl mb-6">{question}</p>
        <button
          onClick={onClose}
          className="px-4 sm:px-6 py-2 text-sm sm:text-base bg-red-500 text-white font-bold rounded-lg shadow hover:bg-red-600 transition-all"
        >
          Chiudi
        </button>
      </div>
    </div>
  );
};

export default QuestionPopup;