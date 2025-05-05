import BallAnimation from "./BallAnimation";
import { useAuthContext } from "@/contexts/AuthContext";
import { useGameContext } from "@/contexts/GameContext";
import { useEffect } from "react";

export default function StartScreen() {
  const { username } = useAuthContext();
  const { setScore } = useGameContext();

  // Reset score when starting a new game
  useEffect(() => {
    setScore(0);
  }, [setScore]);

  return (
    <>
      <main className="flex flex-col items-center min-h-screen bg-gray-900 p-4">
        <h2>Start a New Game</h2>
        <span className="text-white italic text-center px-2 mb-2">
          BounceBack is a single-player twist on the classic Pong game. Use your
          paddles to bounce the ball back and score points!
        </span>
        <span className="text-white text-center px-2">
          Playing as: <span className="font-bold">{username}</span>
        </span>
        <BallAnimation />
      </main>
    </>
  );
}
