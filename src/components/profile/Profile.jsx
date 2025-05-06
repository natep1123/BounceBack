"use client";
import { useEffect, useState } from "react";
import { getHighscores } from "@/lib/dbLogic";
import { useAuthContext } from "@/contexts/AuthContext";
import Link from "next/link";
import UserInfoCard from "./UserInfoCard";
import HighScoresCard from "../HighScoresCard";
import DeleteButton from "./DeleteButton";

export default function Profile() {
  const [highscores, setHighscores] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { isGuest, username, email } = useAuthContext();

  // Fetch highscores data if not a guest
  useEffect(() => {
    if (!isGuest) {
      const fetchData = async () => {
        try {
          const highscoresData = await getHighscores();
          setHighscores(highscoresData);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }
  }, []);

  if (isGuest) {
    return (
      <div className="grid place-items-center h-screen bg-gray-900 p-4">
        <div className="text-center p-6 rounded-xl bg-gray-800 border-t-4 border-yellow-400 shadow-xl">
          <h2 className="text-3xl font-bold text-yellow-400 mb-4">
            Guest Profile
          </h2>
          <span className="text-gray-200 text-lg font-semibold">
            You are currently using a guest account.
          </span>
          <p className="text-gray-200 text-lg">
            Please{" "}
            <Link
              href="/register"
              className="text-orange-300 font-semibold hover:underline"
            >
              register
            </Link>{" "}
            to save your current scores.{" "}
          </p>

          <p className="text-gray-200 text-lg mb-4">
            Otherwise, return to{" "}
            <Link
              href="/game"
              className="text-orange-300 font-semibold hover:underline"
            >
              start screen
            </Link>
            .
          </p>
          <span className="text-gray-200 text-lg text-sm">
            NOTE: Logging out will delete your guest account and associated
            data.
          </span>
        </div>
      </div>
    );
  }

  if (isDeleted) {
    return (
      <div className="grid place-items-center h-screen bg-gray-900 p-4">
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
      <main className="flex flex-col items-center min-h-[calc(100vh-4rem)] p-4">
        <h2>{username}'s Profile</h2>
        <UserInfoCard username={username} email={email} />
        <HighScoresCard />
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
