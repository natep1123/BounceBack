"use client";

import { useState } from "react";
import StartScreen from "./StartScreen";
import PlayScreen from "./PlayScreen";
import OverScreen from "./OverScreen";

// This component manages score & game states and renders the appropriate screen.
export default function Game() {
  const [gameState, setGameState] = useState("start");
  const [score, setScore] = useState(0);

  return (
    <>
      {/* Start Screen */}
      {gameState === "start" && (
        <StartScreen setGameState={setGameState} setScore={setScore} />
      )}

      {/* Play Screen */}
      {gameState === "play" && (
        <PlayScreen
          setGameState={setGameState}
          score={score}
          setScore={setScore}
        />
      )}

      {/* Over Screen */}
      {gameState === "over" && (
        <OverScreen setGameState={setGameState} score={score} />
      )}
    </>
  );
}
