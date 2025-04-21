import ClientGame from "@/components/ClientGame";
import Header from "@/components/Header";

export default function Play({ setGameState, score, setScore }) {
  return (
    <>
      <Header display="game" />
      <main className="flex flex-col items-center min-h-screen bg-gray-900">
        <ClientGame
          setGameState={setGameState}
          score={score}
          setScore={setScore}
        />
      </main>
    </>
  );
}
