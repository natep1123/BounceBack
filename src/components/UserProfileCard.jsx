"use client";

import { useEffect, useState } from "react";
import { getHighscores } from "@/lib/dbLogic";
import HighScoresCard from "./HighScoresCard";
import UserInfoCard from "./UserInfoCard";

export default function UserProfileCard({ username, email }) {
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
      <UserInfoCard username={username} email={email} />
      <HighScoresCard highscores={highscores} />
    </>
  );
}
