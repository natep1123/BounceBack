import ClientGame from "./ClientGame";
import { useEffect } from "react";

export default function PlayScreen({ setGameState, score, setScore }) {
  // Reset score when starting a new game
  useEffect(() => {
    setScore(0);
  }, [setScore]);
  return (
    <>
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-900 mb-2">
        <ClientGame
          setGameState={setGameState}
          score={score}
          setScore={setScore}
        />
      </main>
    </>
  );
}
