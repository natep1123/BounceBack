"use client";

export default function FinalScoreCard({ finalScore }) {
  return (
    <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
      <h3 className="text-2xl font-semibold text-center text-orange-400 mb-4">
        Final Score
      </h3>
      <p className="text-5xl font-bold text-center text-white">
        {finalScore !== undefined && finalScore !== NaN
          ? finalScore
          : "Loading..."}
      </p>
    </div>
  );
}
