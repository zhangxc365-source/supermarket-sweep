import React, { useState } from 'react';
import { MainMenu } from './components/MainMenu';
import { LevelSelection, YCTLevel } from './components/LevelSelection';
import { InstructionsModal } from './components/InstructionsModal';
import { PreparationPhase } from './components/PreparationPhase';
import { GameLoop, GameStats } from './components/GameLoop';
import { ResultScreen } from './components/ResultScreen';
import { VOCABULARY, VocabItem, CATEGORIES } from './data/vocabulary';

type GameState = 'menu' | 'level' | 'prep' | 'playing' | 'result';
type GameMode = 'solo' | 'pk';

export interface PKStats {
  player1: GameStats;
  player2: GameStats;
}

export default function App() {
  const [gameState, setGameState] = useState<GameState>('menu');
  const [gameMode, setGameMode] = useState<GameMode>('solo');
  const [selectedLevel, setSelectedLevel] = useState<YCTLevel>('YCT1');
  const [showInstructions, setShowInstructions] = useState(false);
  const [shoppingList, setShoppingList] = useState<VocabItem[]>([]);
  const [shoppingList2, setShoppingList2] = useState<VocabItem[]>([]);
  const [gameStats, setGameStats] = useState<GameStats | null>(null);
  const [pkStats, setPkStats] = useState<PKStats | null>(null);
  const [gameSessionKey, setGameSessionKey] = useState(0);

  const startGame = (mode: GameMode = 'solo') => {
    setGameMode(mode);
    setGameState('level');
  };

  const generateLevelList = (level: YCTLevel): VocabItem[] => {
    const levelOrder: YCTLevel[] = ['YCT1', 'YCT2', 'YCT3', 'YCT4', 'YCT5', 'YCT6'];
    const currentLevelIdx = levelOrder.indexOf(level);
    
    const currentLevelItems = VOCABULARY.filter(item => item.level === level);

    // Filter categories that exist in this level or any previous level
    const activeCategories = CATEGORIES.filter(cat =>
      VOCABULARY.some(item => item.category === cat && levelOrder.indexOf(item.level as YCTLevel) <= currentLevelIdx)
    );

    const previousLevelsItems = VOCABULARY.filter(item => {
      const itemLevelIdx = levelOrder.indexOf(item.level as YCTLevel);
      const isInCategoryInCurrentLevel = activeCategories.includes(item.category);
      return itemLevelIdx !== -1 && itemLevelIdx < currentLevelIdx && isInCategoryInCurrentLevel;
    });

    const targetCount = 10;
    const currentCount = Math.round(targetCount * 0.6); // 6 items
    const previousCount = targetCount - currentCount; // 4 items

    let selectedItems: VocabItem[] = [];

    // Select 60% from current level
    const shuffledCurrent = [...currentLevelItems].sort(() => 0.5 - Math.random());
    const takenCurrent = shuffledCurrent.slice(0, currentCount);
    selectedItems = [...takenCurrent];

    // Select 40% from previous levels
    const shuffledPrevious = [...previousLevelsItems].sort(() => 0.5 - Math.random());
    const takenPrevious = shuffledPrevious.slice(0, targetCount - selectedItems.length);
    selectedItems = [...selectedItems, ...takenPrevious];

    // If still not enough (e.g. YCT1 has only 10 items, no previous), fill with whatever is left
    if (selectedItems.length < targetCount) {
      const remainingPool = VOCABULARY.filter(item => !selectedItems.some(s => s.id === item.id) && levelOrder.indexOf(item.level as YCTLevel) <= currentLevelIdx);
      const shuffledRemaining = remainingPool.sort(() => 0.5 - Math.random());
      selectedItems = [...selectedItems, ...shuffledRemaining.slice(0, targetCount - selectedItems.length)];
    }

    return selectedItems.sort(() => 0.5 - Math.random());
  };

  const handleLevelSelect = (level: YCTLevel) => {
    setSelectedLevel(level);
    
    const list1 = generateLevelList(level);
    setShoppingList(list1);

    if (gameMode === 'pk') {
      const list2 = generateLevelList(level);
      setShoppingList2(list2);
    }
    
    setGameState('prep');
  };

  const startPlaying = () => {
    setGameState('playing');
  };

  const endGame = (stats: GameStats | PKStats) => {
    if (gameMode === 'solo') {
      setGameStats(stats as GameStats);
    } else {
      setPkStats(stats as PKStats);
    }
    setGameState('result');
  };

  const goHome = () => {
    setGameStats(null);
    setPkStats(null);
    setGameSessionKey((k) => k + 1);
    setGameState('menu');
  };

  const restartCurrentGame = () => {
    setGameSessionKey((k) => k + 1);
    setGameState('playing');
  };

  return (
    <div className="w-full h-screen bg-gray-900 font-sans text-gray-900 overflow-y-auto select-none">
      {gameState === 'menu' && (
        <MainMenu 
          onStart={() => startGame('solo')} 
          onStartPK={() => startGame('pk')}
          onShowInstructions={() => setShowInstructions(true)} 
        />
      )}

      {gameState === 'level' && (
        <LevelSelection onSelect={handleLevelSelect} />
      )}

      {gameState === 'prep' && (
        <PreparationPhase 
          gameMode={gameMode}
          shoppingList={shoppingList} 
          shoppingList2={shoppingList2}
          onComplete={startPlaying} 
        />
      )}

      {gameState === 'playing' && (
        <GameLoop 
          key={gameSessionKey}
          gameMode={gameMode}
          yctLevel={selectedLevel}
          shoppingList={shoppingList} 
          shoppingList2={shoppingList2}
          onEndGame={endGame}
          onRestart={restartCurrentGame}
          onHome={goHome}
        />
      )}

      {gameState === 'result' && (
        <ResultScreen 
          gameMode={gameMode}
          stats={gameStats} 
          pkStats={pkStats}
          onRestart={() => startGame(gameMode)} 
          onHome={goHome} 
        />
      )}

      {showInstructions && (
        <InstructionsModal onClose={() => setShowInstructions(false)} />
      )}
    </div>
  );
}
