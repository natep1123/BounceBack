import Header from "@/components/Header";
import BallAnimation from "./BallAnimation";

export default function StartScreen({ setGameState }) {
  return (
    <>
      <Header display="navbar" />
      <main className="flex flex-col items-center min-h-screen bg-gray-900 mb-2">
        <h2>Start a New Game</h2>
        <span className="text-white italic text-center px-2">
          BounceBack is a single-player twist on the classic Pong game. Use your
          paddles to bounce the ball back and score points!
        </span>
        <BallAnimation setGameState={setGameState} />
      </main>
    </>
  );
}
