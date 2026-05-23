import React from 'react';
import { motion } from 'motion/react';
import { GameStats } from './GameLoop';
import { Check, X, RotateCcw, Home } from 'lucide-react';

import { PKStats } from '../App';

interface ResultScreenProps {
  gameMode: 'solo' | 'pk';
  stats: GameStats | null;
  pkStats: PKStats | null;
  onRestart: () => void;
  onHome: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({ gameMode, stats, pkStats, onRestart, onHome }) => {
  const renderStats = (s: GameStats, title: string, color: string, isWinner?: boolean) => (
    <div className={`bg-white rounded-3xl shadow-xl p-6 border-4 ${color} flex-1 flex flex-col min-h-0`}>
      <h3 className="text-2xl font-black text-center mb-4 uppercase tracking-tight text-gray-700">{title}</h3>
      <div className="text-center mb-6 flex items-center justify-center gap-2 shrink-0">
        <span className="text-6xl font-black text-yellow-500 drop-shadow-sm">{s.score}</span>
        <div className="flex flex-col items-start">
          <span className="text-lg text-gray-400 font-bold leading-none">PTS</span>
          {isWinner && <span className="text-xl font-black text-red-500 animate-bounce">WINNER!</span>}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6 shrink-0">
        <div className="bg-green-50 p-3 rounded-2xl border-2 border-green-100 text-center">
          <div className="text-2xl font-black text-green-600">{s.correctItems.length}</div>
          <div className="text-[10px] text-green-800 uppercase font-black leading-tight">
            Found
          </div>
        </div>
        <div className="bg-red-50 p-3 rounded-2xl border-2 border-red-100 text-center">
          <div className="text-2xl font-black text-red-600">{s.mistakes}</div>
          <div className="text-[10px] text-red-800 uppercase font-black leading-tight">
            Mistakes
          </div>
        </div>
        <div className="bg-blue-50 p-3 rounded-2xl border-2 border-blue-100 text-center">
          <div className="text-2xl font-black text-blue-600">{s.timeLeft}s</div>
          <div className="text-[10px] text-blue-800 uppercase font-black leading-tight">
            Time Left
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-xl p-3 flex-1 overflow-y-auto min-h-0">
        <div className="space-y-1">
          {[...s.correctItems, ...s.missedItems].map((item, idx) => {
            const isCorrect = s.correctItems.some(i => i.id === item.id);
            return (
              <div key={idx} className="flex items-center justify-between p-2 bg-white rounded-lg shadow-sm text-sm">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-gray-50 rounded-lg overflow-visible">
                    {item.imageUrl ? (
                      <img 
                        src={item.imageUrl} 
                        alt={item.english} 
                        className="w-10 h-10 object-contain" 
                        style={{
                          transform: `scale(${item.scale !== undefined ? item.scale : (item.imageUrl.includes('第二部分') ? 1.4 : 1.05)}) translate(${(item.xOffset || 0) * 0.25}px, ${(item.yOffset || 0) * 0.25}px)`
                        }}
                      />
                    ) : (
                      <span className="text-2xl">{item.emoji}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 flex-1">
                    <div className="min-w-[100px]">
                      <div className="text-xl font-bold text-gray-800 leading-tight">{item.chinese}</div>
                      <div className="text-sm text-gray-500 font-medium">{item.pinyin}</div>
                    </div>
                    <div className="flex-1 text-xs text-gray-400 italic font-bold uppercase tracking-wider border-l border-gray-100 pl-4 text-left">
                      {item.english}
                    </div>
                  </div>
                </div>
                <div className={`${isCorrect ? 'text-green-600' : 'text-red-600'} pr-2`}>
                  {isCorrect ? <Check size={20} className="stroke-[3]" /> : <X size={20} className="stroke-[3]" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const winner = pkStats ? (pkStats.player1.score > pkStats.player2.score ? 1 : pkStats.player1.score < pkStats.player2.score ? 2 : 0) : null;

  return (
    <div className="w-full h-full bg-blue-50 flex flex-col items-center justify-center p-4 overflow-y-auto">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-6xl flex flex-col h-full"
      >
        <div className="text-center mb-6">
          <h2 className="text-5xl font-black text-blue-600 uppercase tracking-tighter drop-shadow-md">
            {gameMode === 'pk' ? (
              winner === 0 ? "It's a Tie!" : `Player ${winner} Wins!`
            ) : "Game Over!"}
          </h2>
        </div>

        <div className="flex gap-6 flex-1 min-h-0 mb-4">
          {gameMode === 'solo' && stats && renderStats(stats, "Your Results", "border-blue-200")}
          {gameMode === 'pk' && pkStats && (
            <>
              {renderStats(pkStats.player1, "Player 1 (P1)", winner === 1 ? "border-yellow-400 ring-8 ring-yellow-200" : "border-blue-200", winner === 1)}
              {renderStats(pkStats.player2, "Player 2 (P2)", winner === 2 ? "border-yellow-400 ring-8 ring-yellow-200" : "border-red-200", winner === 2)}
            </>
          )}
        </div>

        <div className="flex gap-4 justify-center pb-2">
          <button
            onClick={onHome}
            className="flex items-center gap-2 px-8 py-4 bg-gray-200 hover:bg-gray-300 text-gray-700 font-black rounded-2xl transition-all shadow-md"
          >
            <Home size={24} />
            Home
          </button>
          <button
            onClick={onRestart}
            className="flex items-center gap-2 px-10 py-4 bg-blue-500 hover:bg-blue-400 text-white font-black rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95"
          >
            <RotateCcw size={24} />
            Play Again
          </button>
        </div>
      </motion.div>
    </div>
  );
};
