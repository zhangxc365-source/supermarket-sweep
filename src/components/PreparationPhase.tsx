import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { VocabItem } from '../data/vocabulary';

interface PreparationPhaseProps {
  gameMode: 'solo' | 'pk';
  shoppingList: VocabItem[];
  shoppingList2?: VocabItem[];
  onComplete: () => void;
}

export const PreparationPhase: React.FC<PreparationPhaseProps> = ({ gameMode, shoppingList, shoppingList2, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete();
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, onComplete]);

  const renderList = (list: VocabItem[], title: string, color: string) => (
    <div className={`flex-1 bg-white p-6 rounded-3xl shadow-xl border-4 ${color} text-center`}>
      <h2 className="text-2xl font-bold text-gray-700 mb-4">{title}</h2>
      <div className="grid grid-cols-2 gap-3">
        {list.map((item, index) => (
          <motion.div
            key={item.id + index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-gray-50 p-4 rounded-xl flex flex-col items-center justify-center border-2 border-gray-100"
          >
            <span className="text-3xl font-bold text-gray-800">{item.chinese}</span>
            <span className="text-lg text-gray-600">{item.pinyin}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="w-full h-full bg-yellow-50 flex flex-col items-center p-8 overflow-y-auto">
      <div className="flex flex-col items-center mb-4 mt-2">
        <h1 className="text-2xl font-black text-yellow-600">Shopping List (购物清单)</h1>
        <div className="bg-white px-6 py-2 rounded-full shadow-md border-2 border-yellow-400 font-bold text-yellow-700">
          Game starts in {timeLeft}s
        </div>
      </div>

      <div className="flex items-center gap-8 w-full max-w-6xl relative">
        {renderList(shoppingList, gameMode === 'pk' ? "Player 1" : "Your List", "border-blue-400")}
        
        {gameMode === 'pk' && shoppingList2 && (
          <>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <div className="bg-red-500 text-white text-5xl font-black p-6 rounded-full shadow-2xl border-4 border-white rotate-12">
                VS
              </div>
            </div>
            {renderList(shoppingList2, "Player 2", "border-red-400")}
          </>
        )}
      </div>

      <div className="mt-12">
        <button
          onClick={onComplete}
          className="px-12 py-4 bg-green-500 hover:bg-green-400 text-white text-2xl font-black rounded-2xl shadow-lg transition-all hover:scale-105 active:scale-95"
        >
          Start Now!
        </button>
      </div>
    </div>
  );
};
