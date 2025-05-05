"use client";

import { useGameContext } from "@/contexts/GameContext";
import StartScreen from "./StartScreen";
import PlayScreen from "./PlayScreen";
import OverScreen from "./OverScreen";

// This component renders the appropriate screen based on gameState.
export default function Game() {
  const { gameState } = useGameContext();

  return (
    <>
      {/* Start Screen */}
      {gameState === "start" && <StartScreen />}

      {/* Play Screen */}
      {gameState === "play" && <PlayScreen />}

      {/* Over Screen */}
      {gameState === "over" && <OverScreen />}
    </>
  );
}
