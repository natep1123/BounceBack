"use client";

import { useEffect, useState } from "react";
import { getLatestScore, getHighscores } from "@/lib/dbLogic";
import FinalScoreCard from "./FinalScoreCard";
import HighScoresCard from "./HighScoresCard";

export default function GameOverCard({ score }) {
  const [highscores, setHighscores] = useState(null);

  useEffect(() => {
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
    <>
      <FinalScoreCard finalScore={score} />
      <HighScoresCard highscores={highscores} />
    </>
  );
}
