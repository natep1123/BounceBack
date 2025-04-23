import Header from "@/components/Header";
import OverCard from "@/components/game/OverCard";

export default function OverScreen({ setGameState, score, setScore }) {
  // Reset game state and score on button click
  function handleClick() {
    setGameState("play");
    setScore(0);
  }
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header display="navbar" />
      <main className="flex flex-col items-center min-h-[calc(100vh-4rem)] px-4">
        <h2>Game Over!</h2>
        <button
          className="mt-2 mb-4 px-4 py-2 text-white bg-pink-600 border-2 border-gray-800 rounded-lg cursor-pointer"
          onClick={() => handleClick()}
        >
          Play Again?
        </button>
        <OverCard score={score} />
      </main>
    </div>
  );
}
