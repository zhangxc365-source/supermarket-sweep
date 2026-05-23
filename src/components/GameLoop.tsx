import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, ShoppingCart, Zap, Clock, Pause, Play, Home, RotateCcw } from 'lucide-react';
import { VocabItem, VOCABULARY, CATEGORIES, CATEGORY_MAP } from '../data/vocabulary';
import { soundManager } from '../utils/sound';
import confetti from 'canvas-confetti';
import { YCTLevel } from './LevelSelection';

import { PKStats } from '../App';

interface GameLoopProps {
  gameMode: 'solo' | 'pk';
  yctLevel: YCTLevel;
  shoppingList: VocabItem[];
  shoppingList2?: VocabItem[];
  onEndGame: (stats: GameStats | PKStats) => void;
}

export interface GameStats {
  score: number;
  correctItems: VocabItem[];
  missedItems: VocabItem[];
  mistakes: number;
  timeLeft: number;
}

const CUSTOM_SORT_ORDER = [
  // 1. 衣物
  '衣服', '裙子', '裤子', '鞋', '帽子', '眼镜', '项圈', '手表',
  // 2. 学习用品
  '铅笔', '书包', '地图', '报纸', '汉语', '数学书', '词典', '杂志',
  // 3. 食物
  '米饭', '面条', '饺子', '包子', '巧克力', '糖', '饼干', '冰淇淋', '月饼', '蛋糕', '面包', '烤鸭', '苹果', '香蕉', '西瓜', '葡萄', '西红柿', '鸡蛋',
  // 4. 生活用品
  '冰箱', '电灯', '空调', '电视', '桌子', '椅子', '床', '沙发', '杯子', '药', '雨伞', '闹钟', '盘子', '碗', '筷子', '叉子', '信封', '灯笼', '钥匙', '儿童车', '鱼缸',
  // 5. 动物
  '猫', '狗', '鱼', '兔子', '熊猫', '老虎', '猴子', '大象', '蝴蝶', '虫子', '鸟',
  // 6. 爱好
  '唱歌', '跳舞', '钢琴', '画画', '照相', '游泳', '跑步', '网球', '乒乓球', '排球', '篮球'
];

export const GameLoop: React.FC<GameLoopProps> = ({ gameMode, yctLevel, shoppingList, shoppingList2, onEndGame }) => {
  const [timeLeft1, setTimeLeft1] = useState(90);
  const [timeLeft2, setTimeLeft2] = useState(90);
  const [isPaused, setIsPaused] = useState(false);
  const [isFinalCountdown, setIsFinalCountdown] = useState(false);
  const [finalCountdownTime, setFinalCountdownTime] = useState(10);
  
  // Player 1 State
  const [score1, setScore1] = useState(0);
  const [cartItems1, setCartItems1] = useState<VocabItem[]>([]);
  const [mistakes1, setMistakes1] = useState(0);
  const [consecutiveCorrect1, setConsecutiveCorrect1] = useState(0);
  const [consecutiveWrong1, setConsecutiveWrong1] = useState(0);
  const [feedback1, setFeedback1] = useState<{ type: 'correct' | 'wrong'; id: string; value: number; timeValue?: number } | null>(null);
  const [foundIds1, setFoundIds1] = useState<Set<string>>(new Set());
  const [shelfIndex1, setShelfIndex1] = useState(0);
  const [direction1, setDirection1] = useState<'next' | 'prev'>('next');
  const [finishedTime1, setFinishedTime1] = useState<number | null>(null);

  // Player 2 State
  const [score2, setScore2] = useState(0);
  const [cartItems2, setCartItems2] = useState<VocabItem[]>([]);
  const [mistakes2, setMistakes2] = useState(0);
  const [consecutiveCorrect2, setConsecutiveCorrect2] = useState(0);
  const [consecutiveWrong2, setConsecutiveWrong2] = useState(0);
  const [feedback2, setFeedback2] = useState<{ type: 'correct' | 'wrong'; id: string; value: number; timeValue?: number } | null>(null);
  const [foundIds2, setFoundIds2] = useState<Set<string>>(new Set());
  const [shelfIndex2, setShelfIndex2] = useState(0);
  const [direction2, setDirection2] = useState<'next' | 'prev'>('next');
  const [finishedTime2, setFinishedTime2] = useState<number | null>(null);

  // Group vocabulary by category for shelves, splitting into pages of max 4 items
  const shelves = CATEGORIES.flatMap(cat => {
    const levelOrder: YCTLevel[] = ['YCT1', 'YCT2', 'YCT3', 'YCT4', 'YCT5', 'YCT6'];
    const maxLevelIdx = levelOrder.indexOf(yctLevel);

    // Rule: include categories with items up to and including the current level
    const hasItemsUpToCurrentLevel = VOCABULARY.some(v => 
      v.category === cat && 
      levelOrder.indexOf(v.level as YCTLevel) <= maxLevelIdx
    );
    if (!hasItemsUpToCurrentLevel) return [];

    const sortFn = (a: VocabItem, b: VocabItem) => {
      const idxA = CUSTOM_SORT_ORDER.indexOf(a.chinese);
      const idxB = CUSTOM_SORT_ORDER.indexOf(b.chinese);

      if (idxA !== -1 && idxB !== -1) {
        return idxA - idxB;
      }
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;

      // Fallback to alphabetical sorting of the group description or vocabulary model order
      const gA = a.group || '';
      const gB = b.group || '';
      if (gA !== gB) {
        return gA.localeCompare(gB);
      }
      return VOCABULARY.indexOf(a) - VOCABULARY.indexOf(b);
    };

    const currentItems = VOCABULARY.filter(v => 
      v.category === cat && 
      levelOrder.indexOf(v.level as YCTLevel) <= maxLevelIdx
    ).sort(sortFn);

    const highLevelItems = VOCABULARY.filter(v => 
      v.category === cat && 
      levelOrder.indexOf(v.level as YCTLevel) > maxLevelIdx
    ).sort(sortFn);

    let catItems = [...currentItems];
    if (catItems.length < 4) {
      const needed = 4 - catItems.length;
      catItems = [...catItems, ...highLevelItems.slice(0, needed)];
    }
    
    if (catItems.length === 0) return [];

    const chunks = [];
    for (let i = 0; i < catItems.length; i += 4) {
      chunks.push({
        category: cat,
        items: catItems.slice(i, i + 4)
      });
    }
    return chunks;
  });

  useEffect(() => {
    if (isPaused) return;
    
    // Check if game should end
    if (gameMode === 'pk') {
      const p1Done = finishedTime1 !== null || timeLeft1 <= 0;
      const p2Done = finishedTime2 !== null || timeLeft2 <= 0;
      
      // Trigger final 10s countdown if one player is done
      if ((p1Done || p2Done) && !isFinalCountdown) {
        setIsFinalCountdown(true);
        setFinalCountdownTime(10);
      }

      if (isFinalCountdown && finalCountdownTime <= 0) {
        handleEndGame();
        return;
      }

      if (p1Done && p2Done) {
        handleEndGame();
        return;
      }
    } else {
      // Solo mode
      if (timeLeft1 <= 0 || finishedTime1 !== null) {
        handleEndGame();
        return;
      }
    }

    const timer = setInterval(() => {
      if (isFinalCountdown) {
        setFinalCountdownTime(t => Math.max(0, t - 1));
        // Also decrease individual timers if they haven't finished
        if (finishedTime1 === null) setTimeLeft1(t => Math.max(0, t - 1));
        if (finishedTime2 === null) setTimeLeft2(t => Math.max(0, t - 1));
      } else {
        if (finishedTime1 === null) setTimeLeft1(t => Math.max(0, t - 1));
        if (gameMode === 'pk' && finishedTime2 === null) setTimeLeft2(t => Math.max(0, t - 1));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft1, timeLeft2, isPaused, finishedTime1, finishedTime2, gameMode, isFinalCountdown, finalCountdownTime]);

  const handleEndGame = () => {
    const p1Correct = shoppingList.filter(item => foundIds1.has(item.id));
    const p1Missed = shoppingList.filter(item => !foundIds1.has(item.id));
    const p1Time = finishedTime1 !== null ? finishedTime1 : timeLeft1;
    const p1FinalScore = score1 + (p1Time * 5);

    const p1Stats: GameStats = {
      score: p1FinalScore,
      correctItems: p1Correct,
      missedItems: p1Missed,
      mistakes: mistakes1,
      timeLeft: p1Time
    };

    if (gameMode === 'solo') {
      onEndGame(p1Stats);
    } else {
      const p2Correct = shoppingList2!.filter(item => foundIds2.has(item.id));
      const p2Missed = shoppingList2!.filter(item => !foundIds2.has(item.id));
      const p2Time = finishedTime2 !== null ? finishedTime2 : timeLeft2;
      const p2FinalScore = score2 + (p2Time * 5);

      const p2Stats: GameStats = {
        score: p2FinalScore,
        correctItems: p2Correct,
        missedItems: p2Missed,
        mistakes: mistakes2,
        timeLeft: p2Time
      };

      onEndGame({
        player1: p1Stats,
        player2: p2Stats
      });
    }
  };

  const handleItemClick = (item: VocabItem, player: 1 | 2) => {
    const currentList = player === 1 ? shoppingList : shoppingList2!;
    const foundIds = player === 1 ? foundIds1 : foundIds2;
    const setFoundIds = player === 1 ? setFoundIds1 : setFoundIds2;
    const setCartItems = player === 1 ? setCartItems1 : setCartItems2;
    const setScore = player === 1 ? setScore1 : setScore2;
    const consecutiveCorrect = player === 1 ? consecutiveCorrect1 : consecutiveCorrect2;
    const setConsecutiveCorrect = player === 1 ? setConsecutiveCorrect1 : setConsecutiveCorrect2;
    const consecutiveWrong = player === 1 ? consecutiveWrong1 : consecutiveWrong2;
    const setConsecutiveWrong = player === 1 ? setConsecutiveWrong1 : setConsecutiveWrong2;
    const setFeedback = player === 1 ? setFeedback1 : setFeedback2;
    const setMistakes = player === 1 ? setMistakes1 : setMistakes2;
    const setTimeLeft = player === 1 ? setTimeLeft1 : setTimeLeft2;

    const isTarget = currentList.some(target => target.id === item.id);
    const alreadyFound = foundIds.has(item.id);

    if (alreadyFound) return;

    if (isTarget) {
      soundManager.playCorrect();
      setFoundIds(prev => new Set(prev).add(item.id));
      setCartItems(prev => [...prev, item]);
      
      const isSprint = consecutiveCorrect >= 2;
      const points = isSprint ? 20 : 10;
      setScore(s => s + points);
      
      setConsecutiveCorrect(c => c + 1);
      setConsecutiveWrong(0);
      setFeedback({ type: 'correct', id: item.id, value: points });
      
      if (consecutiveCorrect >= 2) {
        confetti({ particleCount: 50, spread: 40, origin: { x: player === 1 ? 0.25 : 0.75, y: 0.6 } });
      }

      if (foundIds.size + 1 === currentList.length) {
        if (gameMode === 'solo') {
          setFinishedTime1(timeLeft1);
          setTimeout(handleEndGame, 500);
        } else {
          if (player === 1) {
            setFinishedTime1(timeLeft1);
          } else {
            setFinishedTime2(timeLeft2);
          }
          
          const otherFinished = player === 1 ? (finishedTime2 !== null || timeLeft2 <= 0) : (finishedTime1 !== null || timeLeft1 <= 0);
          if (otherFinished) {
            setTimeout(handleEndGame, 500);
          }
        }
      }
    } else {
      soundManager.playWrong();
      setMistakes(m => m + 1);
      
      const isPenaltySprint = consecutiveWrong >= 2;
      const pointsDeducted = isPenaltySprint ? 10 : 5;
      const timeDeducted = isPenaltySprint ? 0 : 5;
      
      setScore(s => Math.max(0, s - pointsDeducted));
      if (timeDeducted > 0) {
        setTimeLeft(t => Math.max(0, t - timeDeducted));
      }
      
      setConsecutiveCorrect(0);
      setConsecutiveWrong(c => c + 1);
      setFeedback({ 
        type: 'wrong', 
        id: item.id, 
        value: pointsDeducted,
        timeValue: timeDeducted > 0 ? timeDeducted : undefined
      });
    }
    setTimeout(() => setFeedback(null), 500);
  };

  const renderPlayerSide = (player: 1 | 2) => {
    const currentShelfIndex = player === 1 ? shelfIndex1 : shelfIndex2;
    const setShelfIndex = player === 1 ? setShelfIndex1 : setShelfIndex2;
    const direction = player === 1 ? direction1 : direction2;
    const setDirection = player === 1 ? setDirection1 : setDirection2;
    const score = player === 1 ? score1 : score2;
    const timeLeft = player === 1 ? timeLeft1 : timeLeft2;
    const foundIds = player === 1 ? foundIds1 : foundIds2;
    const feedback = player === 1 ? feedback1 : feedback2;
    const cartItems = player === 1 ? cartItems1 : cartItems2;
    const currentShelf = shelves[currentShelfIndex];

    const isFinished = player === 1 ? finishedTime1 !== null : finishedTime2 !== null;
    const isTimedOut = timeLeft <= 0;

    return (
      <div className={`relative flex-1 h-full flex flex-col overflow-hidden ${player === 1 && gameMode === 'pk' ? 'border-r-4 border-white/30' : ''}`}>
        {(isFinished || isTimedOut) && gameMode === 'pk' && (
          <div className="absolute inset-0 z-[55] bg-black/40 backdrop-blur-[2px] flex items-center justify-center">
            <div className={`bg-white/90 px-8 py-4 rounded-3xl border-4 ${isTimedOut ? 'border-red-500' : 'border-green-500'} shadow-2xl transform -rotate-3`}>
              <span className={`text-3xl font-black ${isTimedOut ? 'text-red-600' : 'text-green-600'} uppercase`}>
                {isTimedOut ? 'Time Up!' : 'Finished!'}
              </span>
              <p className="text-sm text-gray-600 font-bold mt-1">Waiting for opponent...</p>
            </div>
          </div>
        )}
        {/* Category Sign */}
        <div className="absolute top-[18%] left-1/2 -translate-x-1/2 z-20 flex flex-col items-center w-48 h-24 justify-center scale-[6] pointer-events-none">
          <div className="relative w-full h-full flex items-center justify-center">
            <img src="/挂牌.png" alt="Sign Board" className="absolute inset-0 w-full h-full object-contain" />
            <motion.div 
              key={currentShelfIndex}
              initial={{ rotateX: 90, opacity: 0 }}
              animate={{ rotateX: 0, opacity: 1 }}
              className="relative z-10 -translate-y-[1.2rem]"
            >
              {(() => {
                const englishCat = CATEGORY_MAP[currentShelf.category] || currentShelf.category;
                const fontSizeClass = englishCat.length > 10 ? 'text-[4.8px]' : englishCat.length > 7 ? 'text-[5.5px]' : 'text-[7.5px]';
                return (
                  <h2 className={`font-black text-yellow-900 uppercase tracking-wider drop-shadow-sm text-center leading-none px-4 ${fontSizeClass}`}>
                    {englishCat}
                  </h2>
                );
              })()}
            </motion.div>
          </div>
        </div>

        {/* Score & Timer */}
        <div className={`absolute top-4 left-4 z-30 flex flex-col gap-3`}>
          <div className="bg-white/90 backdrop-blur px-6 py-3 rounded-full shadow-md border-2 border-yellow-400 font-black text-2xl text-yellow-700">
            {gameMode === 'solo' ? 'Score' : `P${player}`}: {score}
          </div>
          {gameMode === 'pk' && (
            <div className="flex flex-col items-center gap-1">
              <motion.div 
                animate={feedback?.type === 'wrong' && feedback?.timeValue ? {
                  x: [0, -10, 10, -10, 10, 0],
                  backgroundColor: ['#fff', '#fee2e2', '#fff']
                } : {}}
                className={`bg-white/90 backdrop-blur px-6 py-3 rounded-full shadow-md border-2 ${timeLeft < 20 || (feedback?.type === 'wrong' && feedback?.timeValue) ? 'border-red-500 text-red-600' : 'border-blue-400 text-blue-700'} font-black text-3xl text-center relative`}
              >
                {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                
                <AnimatePresence>
                  {feedback?.type === 'wrong' && feedback?.timeValue && (
                    <motion.div
                      initial={{ opacity: 0, y: 0 }}
                      animate={{ opacity: 1, y: -40 }}
                      exit={{ opacity: 0 }}
                      className="absolute -top-10 left-1/2 -translate-x-1/2 text-red-600 font-black text-2xl whitespace-nowrap"
                    >
                      -{feedback.timeValue}s
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          )}
        </div>

        {/* Items Area */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none pt-20">
          <AnimatePresence mode='wait' custom={direction}>
            <motion.div
              key={currentShelfIndex}
              initial={{ x: direction === 'next' ? 300 : -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction === 'next' ? -300 : 300, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full flex justify-center px-4 pointer-events-auto"
            >
              <div className="grid grid-cols-4 gap-x-6 gap-y-6">
                {currentShelf.items.map(item => {
                  const isCollected = foundIds.has(item.id);
                  const isFeedbackTarget = feedback?.id === item.id;
                  
                  // Compute customized scale and offsets to correct layout and alignment
                  const itemScale = item.scale !== undefined ? item.scale : (item.imageUrl?.includes('第二部分') ? 1.4 : 1.05);
                  const yVal = item.yOffset !== undefined ? item.yOffset : 0;
                  const xVal = item.xOffset !== undefined ? item.xOffset : 0;

                  return (
                    <motion.button
                      key={item.id}
                      onClick={() => !isPaused && handleItemClick(item, player)}
                      disabled={isCollected || isPaused}
                      whileHover={!isCollected && !isPaused ? { scale: 1.1 } : {}}
                      whileTap={!isCollected && !isPaused ? { scale: 0.95 } : {}}
                      className={`relative w-36 h-36 md:w-48 h-48 flex items-center justify-center p-3 transition-all ${isCollected ? 'opacity-20 grayscale' : 'cursor-pointer drop-shadow-xl'}`}
                    >
                      {item.imageUrl ? (
                        <div className="w-full h-full flex items-center justify-center overflow-visible">
                          <img 
                            src={item.imageUrl} 
                            alt={item.english} 
                            className="w-full h-full object-contain transition-all" 
                            style={{ 
                              imageRendering: '-webkit-optimize-contrast' as any,
                              transform: `scale(${itemScale}) translate(${xVal}px, ${yVal}px)`
                            }}
                          />
                        </div>
                      ) : (
                        <span className="text-7xl">{item.emoji}</span>
                      )}
                      {isFeedbackTarget && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1.5, opacity: 1, y: -60 }}
                          className={`absolute text-4xl font-black ${feedback.type === 'correct' ? 'text-green-500' : 'text-red-500'} pointer-events-none z-50`}
                          style={{ textShadow: '2px 2px 0 #fff' }}
                        >
                          {feedback.type === 'correct' ? `+${feedback.value}` : `-${feedback.value}`}
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <button 
          onClick={() => {
            if (isPaused) return;
            setDirection('prev');
            setShelfIndex(prev => (prev - 1 + shelves.length) % shelves.length);
          }}
          disabled={isPaused}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full shadow-lg text-yellow-600 border-2 border-yellow-400 z-30 disabled:opacity-50"
        >
          <ArrowLeft size={32} />
        </button>
        <button 
          onClick={() => {
            if (isPaused) return;
            setDirection('next');
            setShelfIndex(prev => (prev + 1) % shelves.length);
          }}
          disabled={isPaused}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 rounded-full shadow-lg text-yellow-600 border-2 border-yellow-400 z-30 disabled:opacity-50"
        >
          <ArrowRight size={32} />
        </button>

        {/* Cart */}
        <div className="absolute bottom-[-30px] left-1/2 -translate-x-1/2 w-[460px] h-[345px] pointer-events-none z-40">
          <img src="/推车.png" alt="Cart" className="absolute inset-0 w-full h-full object-contain z-10" />
          <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[345px] h-[172px] flex items-center justify-center overflow-hidden z-20">
            <div className="grid grid-cols-5 gap-2 justify-items-center">
              {cartItems.slice(-10).map((item, i) => {
                const itemScale = item.scale !== undefined ? item.scale : (item.imageUrl?.includes('第二部分') ? 1.4 : 1.05);
                const yVal = item.yOffset !== undefined ? item.yOffset : 0;
                const xVal = item.xOffset !== undefined ? item.xOffset : 0;
                return (
                  <motion.div key={`${item.id}-${i}`} initial={{ y: -20 }} animate={{ y: 0 }} className="w-12 h-12 flex items-center justify-center overflow-visible">
                    {item.imageUrl ? (
                      <img 
                        src={item.imageUrl} 
                        className="w-full h-full object-contain" 
                        style={{
                          transform: `scale(${itemScale * 0.85}) translate(${xVal * 0.3}px, ${yVal * 0.3}px)`
                        }}
                      />
                    ) : (
                      <span className="text-2xl">{item.emoji}</span>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden relative font-sans">
      <img src="/背景.png" alt="BG" className="absolute inset-0 w-full h-full object-cover z-0" />

      {/* Pause Button */}
      <div className="absolute top-4 right-4 z-[60]">
        <button
          onClick={() => setIsPaused(true)}
          className="p-3 bg-white/90 rounded-full shadow-lg text-yellow-600 border-2 border-yellow-400 hover:scale-110 transition-transform"
        >
          <Pause size={24} />
        </button>
      </div>

      {/* Final Countdown Overlay for PK Mode */}
      <AnimatePresence>
        {isFinalCountdown && finalCountdownTime > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 2 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[70] pointer-events-none"
          >
            <div className="bg-red-600 text-white px-12 py-6 rounded-full shadow-2xl border-8 border-white flex flex-col items-center">
              <span className="text-2xl font-black uppercase tracking-widest">Final Sprint!</span>
              <span className="text-8xl font-black">{finalCountdownTime}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {gameMode === 'solo' ? (
        <div className="w-full h-full flex flex-col relative">
          {renderPlayerSide(1)}
          
          {/* Shared Timer for Solo */}
          <div className="absolute bottom-12 left-12 z-50 pointer-events-auto">
            <motion.div 
              animate={feedback1?.type === 'wrong' && feedback1?.timeValue ? {
                x: [0, -10, 10, -10, 10, 0],
                backgroundColor: ['#fff', '#fee2e2', '#fff']
              } : {}}
              className="bg-white/80 rounded-full w-32 h-32 flex flex-col items-center justify-center border-4 border-yellow-500 shadow-xl relative"
            >
              <Clock className="text-yellow-700 mb-1" size={32} />
              <div className={`text-3xl font-black ${timeLeft1 < 30 || (feedback1?.type === 'wrong' && feedback1?.timeValue) ? 'text-red-600' : 'text-yellow-800'}`}>
                 {Math.floor(timeLeft1 / 60)}:{(timeLeft1 % 60).toString().padStart(2, '0')}
              </div>

              <AnimatePresence>
                {feedback1?.type === 'wrong' && feedback1?.timeValue && (
                  <motion.div
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: 1, y: -60 }}
                    exit={{ opacity: 0 }}
                    className="absolute -top-12 left-1/2 -translate-x-1/2 text-red-600 font-black text-3xl whitespace-nowrap"
                  >
                    -{feedback1.timeValue}s
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex relative">
          {renderPlayerSide(1)}
          {renderPlayerSide(2)}
        </div>
      )}

      {/* Pause Modal */}
      <AnimatePresence>
        {isPaused && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full border-4 border-yellow-400 text-center"
            >
              <h2 className="text-4xl font-black text-yellow-600 mb-8 uppercase tracking-tighter">Paused</h2>
              
              <div className="flex flex-col gap-4">
                <button
                  onClick={() => setIsPaused(false)}
                  className="flex items-center justify-center gap-3 w-full py-4 bg-green-500 hover:bg-green-400 text-white text-xl font-bold rounded-2xl shadow-lg transition-all"
                >
                  <Play size={24} fill="currentColor" />
                  继续 (Continue)
                </button>
                
                <button
                  onClick={() => window.location.reload()}
                  className="flex items-center justify-center gap-3 w-full py-4 bg-blue-500 hover:bg-blue-400 text-white text-xl font-bold rounded-2xl shadow-lg transition-all"
                >
                  <RotateCcw size={24} />
                  重新开始 (Restart)
                </button>
                
                <button
                  onClick={() => window.location.href = '/'}
                  className="flex items-center justify-center gap-3 w-full py-4 bg-gray-200 hover:bg-gray-300 text-gray-700 text-xl font-bold rounded-2xl transition-all"
                >
                  <Home size={24} />
                  回到首页 (Home)
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
