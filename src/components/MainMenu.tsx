import React from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, Zap } from 'lucide-react';

interface MainMenuProps {
  onStart: () => void;
  onStartPK: () => void;
  onShowInstructions: () => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({ onStart, onStartPK, onShowInstructions }) => {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-blue-400 to-blue-200 overflow-y-auto p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-10 left-10 text-9xl">🛒</div>
        <div className="absolute bottom-10 right-10 text-9xl">🍎</div>
        <div className="absolute top-20 right-20 text-8xl">🐱</div>
        <div className="absolute bottom-20 left-20 text-8xl">⚽</div>
      </div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="z-10 text-center"
      >
        <h1 className="text-[120px] font-black text-white drop-shadow-[0_10px_10px_rgba(0,0,0,0.3)] mb-4 tracking-wider leading-none">
          超市大搜索
        </h1>
        <h2 className="text-6xl font-black text-yellow-300 drop-shadow-lg mb-16 font-mono tracking-tight">
          Supermarket Sweep
        </h2>

        <div className="flex flex-col gap-4 items-center">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStart}
            className="w-64 py-4 bg-green-500 hover:bg-green-400 text-white text-2xl font-bold rounded-full shadow-lg border-4 border-green-600 transition-colors flex items-center justify-center gap-3"
          >
            <ShoppingCart size={32} />
            单人 (Solo)
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStartPK}
            className="w-64 py-4 bg-purple-500 hover:bg-purple-400 text-white text-2xl font-bold rounded-full shadow-lg border-4 border-purple-600 transition-colors flex items-center justify-center gap-3"
          >
            <Zap size={32} fill="currentColor" />
            对战 (PK Mode)
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onShowInstructions}
            className="w-64 py-3 bg-orange-400 hover:bg-orange-300 text-white text-xl font-bold rounded-full shadow-lg border-4 border-orange-500 transition-colors"
          >
            游戏说明 (Rules)
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};
