"use client";

import { useEffect, useState } from "react";

export default function ClientGame() {
  const [count, setCount] = useState(3);
  const [score, setScore] = useState(0);

  // Countdown effect on mount
  useEffect(() => {
    if (count > 0) {
      const timer = setInterval(() => {
        setCount((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [count]);

  return (
    <>
      <h2 className="text-2xl font-bold text-white mt-4">Score: {score}</h2>
      <div className="flex flex-col items-center rounded-lg shadow-lg p-6 w-full max-w-md">
        {count > 0 ? (
          <div className="flex items-center justify-center h-[300px] w-[65vw] bg-gray-800 border-2 border-pink-600 rounded-lg">
            <span className="text-6xl font-bold text-white">{count}</span>
          </div>
        ) : (
          <div className="flex items-center justify-center h-[300px] w-[65vw] bg-gray-800 border-2 border-pink-600 rounded-lg">
            <span className="text-2xl font-bold text-white">
              Game content here.
            </span>
          </div>
        )}
      </div>
    </>
  );
}
