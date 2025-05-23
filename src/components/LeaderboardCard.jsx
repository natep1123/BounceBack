"use client";

import { useEffect, useState } from "react";
import { getLeaderboard } from "@/lib/dbLogic";

export default function LeaderboardCard({ username }) {
  const [leaderboard, setLeaderboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const medals = ["🥇", "🥈", "🥉"];
  const topColors = ["text-yellow-400", "text-gray-400", "text-amber-600"];

  // Fetch leaderboard data on component mount
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const data = await getLeaderboard();
        setLeaderboard(data);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
        setLeaderboard({ scores: [], message: "Failed to load leaderboard" });
      }
      setLoading(false);
    };
    fetchLeaderboard();
  }, []);

  return (
    <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg shadow-pink-500/20 p-4">
      {leaderboard?.scores && leaderboard.scores.length > 0 ? (
        <div className="space-y-4">
          {leaderboard.scores.map((entry, index) => (
            <div
              key={index}
              className="grid grid-cols-[40px_1fr_80px_80px] items-center gap-x-2 bg-gray-700 rounded-md p-3"
            >
              <span
                className={`text-lg font-medium ${
                  index < 3 ? topColors[index] : "text-white"
                }`}
              >
                #{index + 1}
              </span>
              <span
                className={`text-lg font-medium truncate ${
                  username && entry.username === username
                    ? "text-yellow-400"
                    : "text-white"
                }`}
              >
                {index < 3 ? medals[index] : null} {entry.username}
              </span>
              <span className="text-xl font-bold text-pink-400 text-right">
                {entry.score}
              </span>
              <span className="text-sm text-gray-400 text-right">
                {new Date(entry.createdAt).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400">
          {loading && "Loading..."}
          {leaderboard?.message === "Failed to retrieve leaderboard scores" &&
            "Error!"}
        </p>
      )}
      {leaderboard?.message && (
        <p className="text-center text-gray-400 mt-4">{leaderboard.message}</p>
      )}
    </div>
  );
}
