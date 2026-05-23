import React from 'react';
import { motion } from 'motion/react';
import { Award } from 'lucide-react';

export type YCTLevel = 'YCT1' | 'YCT2' | 'YCT3' | 'YCT4' | 'YCT5' | 'YCT6';

interface LevelSelectionProps {
  onSelect: (level: YCTLevel) => void;
}

export const LevelSelection: React.FC<LevelSelectionProps> = ({ onSelect }) => {
  const levels: YCTLevel[] = ['YCT1', 'YCT2', 'YCT3', 'YCT4', 'YCT5', 'YCT6'];

  return (
    <div className="w-full h-full bg-blue-50 flex flex-col items-center justify-center p-4 overflow-y-auto">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-4xl text-center"
      >
        <h2 className="text-5xl font-black text-blue-600 uppercase tracking-tighter mb-4 drop-shadow-md">
          选择等级 (Select Level)
        </h2>
        <p className="text-xl text-blue-800 mb-12 font-medium">
          请选择你要挑战的 YCT 等级
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {levels.map((level) => (
            <motion.button
              key={level}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelect(level)}
              className="bg-white p-8 rounded-3xl shadow-xl border-4 border-white hover:border-blue-400 transition-all flex flex-col items-center gap-4 group"
            >
              <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Award size={40} />
              </div>
              <span className="text-3xl font-black text-gray-800 uppercase tracking-tight">
                {level}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
