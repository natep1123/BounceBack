import ClientGame from "./ClientGame";

export default function PlayScreen({ setGameState, score, setScore, isGuest }) {
  return (
    <>
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-900 mb-2">
        <ClientGame
          setGameState={setGameState}
          score={score}
          setScore={setScore}
          isGuest={isGuest}
        />
      </main>
    </>
  );
}
