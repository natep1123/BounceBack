"use client";

import { useState } from "react";
import StartScreen from "./StartScreen";
import PlayScreen from "./PlayScreen";
import OverScreen from "./OverScreen";

// This component manages score & game states and renders the appropriate screen.
// It leverages prop drilling to easily manage state from other components.
export default function Game() {
  const [gameState, setGameState] = useState("start");
  const [score, setScore] = useState(0);
  return (
    <>
      {gameState === "start" && <StartScreen setGameState={setGameState} />}
      {gameState === "play" && (
        <PlayScreen
          setGameState={setGameState}
          score={score}
          setScore={setScore}
        />
      )}
      {gameState === "over" && (
        <OverScreen
          setGameState={setGameState}
          score={score}
          setScore={setScore}
        />
      )}
    </>
  );
}
