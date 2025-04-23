"use client";
import { useEffect, useState } from "react";
import { getHighscores } from "@/lib/dbLogic";
import Header from "../Header";
import UserInfoCard from "./UserInfoCard";
import HighScoresCard from "../HighScoresCard";
import DeleteButton from "./DeleteButton";

export default function Profile({ username, email }) {
  const [highscores, setHighscores] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  if (isDeleted) {
    return (
      <div className="grid place-items-center h-screen bg-gray-900">
        <div className="text-center p-6 rounded-xl bg-gray-800 border-t-4 border-red-400 shadow-xl">
          <h2 className="text-3xl font-bold text-red-400 mb-4">
            Account Deleted
          </h2>
          <p className="text-gray-200 text-lg">
            Your account and associated data have been successfully deleted.
          </p>
          <p className="text-gray-400 mt-2">Redirecting to homepage...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white text-center">
      <Header display="navbar" />
      <main className="flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 mb-2">
        <h2>{username}'s Profile</h2>
        <UserInfoCard username={username} email={email} />
        <HighScoresCard highscores={highscores} />
        <DeleteButton
          loading={loading}
          setLoading={setLoading}
          setError={setError}
          setIsDeleted={setIsDeleted}
        />
        {error && (
          <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
            {error}
          </div>
        )}
      </main>
    </div>
  );
}
