import ClientGame from "./ClientGame";
import { useEffect } from "react";
import { useGameContext } from "@/contexts/GameContext";

export default function PlayScreen() {
  const { setScore } = useGameContext();
  // Reset score when starting a new game
  useEffect(() => {
    setScore(0);
  }, [setScore]);

  return (
    <>
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-900 mb-2">
        <ClientGame />
      </main>
    </>
  );
}
