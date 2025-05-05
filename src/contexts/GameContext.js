"use client";

import { createContext, useContext, useState } from "react";

const GameContext = createContext();

export function GameProvider({ children }) {
  const [gameState, setGameState] = useState("start");
  const [score, setScore] = useState(0);

  return (
    <GameContext.Provider value={{ gameState, setGameState, score, setScore }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGameContext() {
  return useContext(GameContext);
}
