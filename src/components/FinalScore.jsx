"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function FinalScore() {
  const [finalScore, setFinalScore] = useState(null);
  const [message, setMessage] = useState("");
  let count = 0;

  useEffect(() => {
    if (count > 0) return; // Prevent multiple calls
    // Get score from local storage
    const storedScore = localStorage.getItem("gameScore");
    if (!storedScore) {
      setMessage("Play to earn a score!");
      return;
    }
    const score = parseInt(storedScore) || 0;
    setFinalScore(score);
    localStorage.removeItem("gameScore"); // Clear score from local storage

    // Send score to backend to check if it's in top 5
    const saveScore = async () => {
      try {
        const response = await axios.post("/api/scores", { score });
        setMessage(response.data.message);
      } catch (error) {
        console.error("Error saving score:", error);
        setMessage(error.response?.data?.error || "Error saving score");
      }
    };
    count++;
    saveScore();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <h3 className="font-bold text-2xl mb-2">
        Final score: {finalScore !== null ? finalScore : "N/A"}
      </h3>
      {message && <p className="text-lg">{message}</p>}
    </div>
  );
}
