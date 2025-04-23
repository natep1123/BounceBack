"use client";

import { useEffect, useState } from "react";
import { getLeaderboard } from "@/lib/dbLogic";

export default function LeaderboardCard() {
  const [leaderboard, setLeaderboard] = useState(null);

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
    };
    fetchLeaderboard();
  }, []);

  return (
    <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-6 mb-4">
      <h3 className="text-2xl font-semibold text-center text-orange-400 mb-4">
        All-Time Top Scores
      </h3>
      {leaderboard?.scores && leaderboard.scores.length > 0 ? (
        <div className="space-y-4">
          {leaderboard.scores.map((entry, index) => (
            <div
              key={index}
              className="grid grid-cols-[40px_1fr_80px_80px] items-center gap-x-2 bg-gray-700 rounded-md p-3"
            >
              <span className="text-lg font-medium text-white">
                #{index + 1}
              </span>
              <span className="text-lg font-medium text-white truncate">
                {entry.username}
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
        <p className="text-center text-gray-400">Loading...</p>
      )}
      {leaderboard?.message && (
        <p className="text-center text-gray-400 mt-4">{leaderboard.message}</p>
      )}
    </div>
  );
}
