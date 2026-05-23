import React from 'react';
import { motion } from 'motion/react';
import { X } from 'lucide-react';

interface InstructionsModalProps {
  onClose: () => void;
}

export const InstructionsModal: React.FC<InstructionsModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl relative border-4 border-blue-400"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
        >
          <X size={24} className="text-gray-600" />
        </button>

        <h2 className="text-4xl font-bold text-center text-blue-600 mb-8">游戏说明 (Instructions)</h2>

        <div className="space-y-6">
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
            <h3 className="text-xl font-bold text-blue-800 mb-2 flex items-center gap-2">
              🇬🇧 English
            </h3>
            <ul className="list-disc list-inside space-y-2 text-blue-900 font-medium">
              <li>Look at the shopping list and find the items.</li>
              <li>Click correct items to get points (+10).</li>
              <li>Mistakes deduct 5 points and 5 seconds.</li>
              <li>3+ consecutive mistakes double the point penalty but no time is deducted.</li>
              <li>Game time: 90 seconds.</li>
              <li>3 correct clicks in a row triggers <strong>Sprint Mode</strong> (Double Points)!</li>
            </ul>
          </div>

          <div className="bg-green-50 p-6 rounded-xl border border-green-100">
            <h3 className="text-xl font-bold text-green-800 mb-2 flex items-center gap-2">
              🇲🇳 Mongolian
            </h3>
            <ul className="list-disc list-inside space-y-2 text-green-900 font-medium">
              <li>Худалдан авалтын жагсаалтаас эд зүйлсийг олоорой.</li>
              <li>Зөв зүйл дээр дарж оноо авна (+10).</li>
              <li>Буруу дарвал 5 оноо болон 5 секунд хасагдана.</li>
              <li>3-аас дээш удаа дараалан буруу дарвал оноо хоёр дахин хасагдах боловч цаг хасагдахгүй.</li>
              <li>Тоглоомын цаг: 90 секунд.</li>
              <li>3 удаа дараалан зөв таавал <strong>Хурдны горим</strong> (Оноог хоёр дахин үржүүлнэ)!</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={onClose}
            className="px-8 py-3 bg-blue-500 hover:bg-blue-400 text-white font-bold rounded-xl shadow-md transition-colors"
          >
            OK, I got it!
          </button>
        </div>
      </motion.div>
    </div>
  );
};
