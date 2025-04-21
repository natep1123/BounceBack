"use client";

import { useState } from "react";
import StartScreen from "./StartScreen";
import PlayScreen from "./PlayScreen";
import OverScreen from "./OverScreen";

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
