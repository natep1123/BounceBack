"use client";

import Header from "@/components/Header";
import { getHighscores } from "@/lib/dbLogic";
import FinalScoreCard from "./FinalScoreCard";
import HighScoresCard from "../HighScoresCard";
import { useState, useEffect } from "react";

export default function OverScreen({ setGameState, score, setScore, isGuest }) {
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

  const [highscores, setHighscores] = useState(null);

  // Fetch highscores data
  useEffect(() => {
    if (isGuest) return;

    const fetchData = async () => {
      try {
        const highscoresData = await getHighscores();
        setHighscores(highscoresData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header
        display="navbar"
        setGameState={setGameState}
        setScore={setScore}
      />
      <main className="flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 mb-2">
        <h2>Game Over!</h2>
        <button
          className="mb-4 px-4 py-2 text-white bg-pink-600 border-2 border-gray-800 rounded-lg cursor-pointer"
          onClick={handleClick}
        >
          Play Again?
        </button>
        <span className="test-white italic mb-4 text-center px-2">
          Returning to start screen in {timeLeft} seconds
        </span>
        <FinalScoreCard finalScore={score} />

        {/* Highscores Display for Users*/}
        {!isGuest && <HighScoresCard highscores={highscores} />}

        {/* Highscores Display for Guests */}
        {isGuest && (
          <div className="space-y-4">
            <div className="flex items-center bg-gray-700 rounded-md p-3">
              <span className="text-lg font-medium text-white">
                Create an account to save scores!
              </span>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
