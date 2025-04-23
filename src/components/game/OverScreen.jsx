"use client";

import Header from "@/components/Header";
import OverCard from "@/components/game/OverCard";
import { useState, useEffect } from "react";

export default function OverScreen({ setGameState, score, setScore }) {
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes

  // Handle button click to reset game state, score, and timer
  function handleClick() {
    setGameState("play");
    setScore(0);
    setTimeLeft(120);
  }

  // Timer to return back to start screen after 2 minutes
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          //Reset when timer reaches 0
          clearInterval(timer);
          setGameState("start");
          setScore(0);
          return 120;
        }
        return prevTime - 1;
      });
    }, 1000);

    // Cleanup
    return () => clearInterval(timer);
  }, [setGameState, setScore]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header display="navbar" />
      <main className="flex flex-col items-center min-h-[calc(100vh-4rem)] px-4">
        <h2>Game Over!</h2>
        <button
          className="mb-4 px-4 py-2 text-white bg-pink-600 border-2 border-gray-800 rounded-lg cursor-pointer"
          onClick={handleClick}
        >
          Play Again?
        </button>
        <span className="test-white italic mb-4">
          Returning to start screen in {timeLeft} seconds
        </span>
        <OverCard score={score} />
      </main>
    </div>
  );
}
