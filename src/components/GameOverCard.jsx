"use client";

import { useEffect, useState } from "react";
import { getLatestScore, getHighscores } from "@/lib/dbLogic";
import FinalScoreCard from "./FinalScoreCard";
import HighScoresCard from "./HighScoresCard";

export default function GameOverCard() {
  const [finalScore, setFinalScore] = useState(null);
  const [highscores, setHighscores] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const latestScore = await getLatestScore();
        setFinalScore(latestScore);
        const highscoresData = await getHighscores();
        setHighscores(highscoresData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <FinalScoreCard finalScore={finalScore} />
      <HighScoresCard highscores={highscores} />
    </>
  );
}
