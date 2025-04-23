"use client";
import { use, useEffect, useState } from "react";

export default function HighScoresCard({ highscores }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (highscores?.scores.length !== 0) {
      setLoading(false);
    }
  }, [highscores]);

  return (
    <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-6 mb-4">
      <h3 className="text-2xl font-semibold text-center text-orange-400 mb-4">
        High Scores
      </h3>

      {/* Highscores list */}
      {highscores?.scores && highscores.scores.length > 0 ? (
        <div className="space-y-4">
          {highscores.scores.map((score, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-700 rounded-md p-3"
            >
              <span className="text-lg font-medium text-white">
                #{index + 1}
              </span>
              <span className="text-xl font-bold text-pink-400">
                {score.score}
              </span>
              <span className="text-sm text-gray-400">
                {new Date(score.createdAt).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400">
          {loading ? "Loading..." : null}
          {highscores?.scores.length === 0
            ? "Play a game to earn a score!"
            : null}
        </p>
      )}

      {/* Message (e.g. top scores retrieved) */}
      {highscores?.message && (
        <p className="text-center text-gray-400 mt-4">{highscores.message}</p>
      )}
    </div>
  );
}
