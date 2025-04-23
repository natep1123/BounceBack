"use client";

import { useEffect, useState } from "react";
import { getHighscores } from "@/lib/dbLogic";
import FinalScoreCard from "./FinalScoreCard";
import HighScoresCard from "../HighScoresCard";

export default function OverCard({ score }) {
  const [highscores, setHighscores] = useState(null);

  // Fetch highscores data
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
