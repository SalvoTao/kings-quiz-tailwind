import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const QuestionPopup = ({ question, onAnswer }) => {
  const [confirmChoice, setConfirmChoice] = useState(null);

  if (!question) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-md z-50 p-4">
      {/* Oscuriamo leggermente il popup della domanda quando compare l'avviso */}
      <motion.div
        animate={confirmChoice !== null ? { opacity: 0.3 } : { opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="relative bg-blue-900 p-6 sm:p-8 rounded-2xl shadow-[0_0_20px_rgba(255,215,0,0.8)] w-[90%] max-w-3xl text-center border-4 border-yellow-400"
      >
        {/* Info della domanda */}
        <p className="text-lg sm:text-xl text-yellow-300 uppercase">
          {question.categoria} • {question.punteggio} punti
        </p>

        {/* Barra separatrice */}
        <div className="w-full h-1.5 bg-yellow-400 rounded-full mt-2"></div>

        {/* Titolo */}
        <h2 className="mt-6 text-xl sm:text-2xl text-white uppercase tracking-wide">
          Domanda
        </h2>

        {/* Contenitore della domanda */}
        <div className="mt-4 bg-blue-800 p-4 sm:p-6 rounded-lg border-2 border-yellow-400 
                        shadow-[inset_0_4px_8px_rgba(0,0,0,0.5),inset_0_-4px_8px_rgba(255,255,255,0.1)]"
        >
          <p className="text-base sm:text-lg md:text-xl text-white leading-relaxed">
            {question.domanda}
          </p>
        </div>

        {/* Pulsanti CORRETTA / SBAGLIATA */}
        <div className="mt-6 flex justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setConfirmChoice(true)}
            className="px-5 py-2 text-sm sm:text-base font-bold uppercase rounded-lg transition-all duration-200
              bg-green-400 text-white hover:bg-green-300 active:translate-y-1"
          >
            ✅ Corretta
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setConfirmChoice(false)}
            className="px-5 py-2 text-sm sm:text-base font-bold uppercase rounded-lg transition-all duration-200
              bg-red-400 text-white hover:bg-red-300 active:translate-y-1"
          >
            ❌ Sbagliata
          </motion.button>
        </div>
      </motion.div>

      {/* Popup di conferma migliorato */}
      <AnimatePresence>
        {confirmChoice !== null && (
          <motion.div
            key="confirmationPopup"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute flex items-center justify-center"
          >
            <motion.div
              initial={{ y: -20, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
              className="bg-white bg-opacity-30 backdrop-blur-lg p-6 rounded-xl border-2 border-yellow-400 
                         shadow-[0_0_30px_rgba(255,255,0,0.8)] w-[90%] max-w-md text-center"
            >
              <p className="text-white text-lg sm:text-xl">
                Sei sicuro di voler selezionare{" "}
                <span className={confirmChoice ? "text-green-400" : "text-red-400"}>
                  {confirmChoice ? "CORRETTA" : "SBAGLIATA"}
                </span>
                ?
              </p>

              <div className="mt-4 flex justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    onAnswer(confirmChoice);
                    setConfirmChoice(null);
                  }}
                  className="px-4 py-2 text-sm sm:text-base font-bold uppercase rounded-lg transition-all duration-200
                    bg-green-500 text-white hover:bg-green-400 active:translate-y-1 shadow-md"
                >
                  Conferma
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setConfirmChoice(null)}
                  className="px-4 py-2 text-sm sm:text-base font-bold uppercase rounded-lg transition-all duration-200
                    bg-gray-500 text-white hover:bg-gray-400 active:translate-y-1 shadow-md"
                >
                  Annulla
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuestionPopup;