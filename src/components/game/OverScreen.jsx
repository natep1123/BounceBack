"use client";

import { getHighscores } from "@/lib/dbLogic";
import { useState, useEffect } from "react";
import { useAuthContext } from "@/contexts/AuthContext";
import { useGameContext } from "@/contexts/GameContext";
import Link from "next/link";
import FinalScoreCard from "./FinalScoreCard";
import HighScoresCard from "../HighScoresCard";

export default function OverScreen() {
  const { isGuest } = useAuthContext();
  const { setGameState, score } = useGameContext();
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes

  // Handle button click to reset game state, score, and timer
  function handleClick() {
    setGameState("play");
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
          return 120;
        }
        return prevTime - 1;
      });
    }, 1000);

    // Cleanup
    return () => clearInterval(timer);
  }, [setGameState]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <main className="flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 mb-2">
        <h2>Game Over!</h2>
        <button
          className="mb-4 px-4 py-2 text-white bg-pink-600 rounded-lg cursor-pointer"
          onClick={handleClick}
        >
          Play Again?
        </button>
        <span className="test-white italic mb-4 text-center px-2">
          Returning to start screen in {timeLeft} seconds
        </span>
        <FinalScoreCard finalScore={score} />

        {/* Highscores Display for Users*/}
        {!isGuest && <HighScoresCard />}

        {/* Highscores Display for Guests */}
        {isGuest && (
          <div className="space-y-4 text-center">
            <div className="flex items-center bg-gray-700 rounded-md p-3 w-full max-w-md">
              <span className="text-lg font-medium text-white">
                You're currently playing as a guest.{" "}
                <Link
                  href="/register"
                  className="text-orange-300 font-semibold hover:underline"
                >
                  Register
                </Link>{" "}
                to save your current scores. Logging out will delete your guest
                account and associated data.
              </span>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
