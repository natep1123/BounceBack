import Header from "@/components/Header";
import BallAnimation from "@/components/BallAnimation";

export default function StartScreen({ setGameState }) {
  return (
    <>
      <Header display="navbar" />
      <main className="flex flex-col items-center min-h-screen bg-gray-900">
        <h2>Start a New Game</h2>
        <span className="text-white italic">
          BounceBack is a single-player twist on the classic Pong game. Use your
          paddles to bounce the ball back and score points!
        </span>
        <BallAnimation setGameState={setGameState} />
      </main>
    </>
  );
}
