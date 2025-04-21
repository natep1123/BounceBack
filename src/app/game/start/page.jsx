import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Header from "@/components/Header";
import BallAnimation from "@/components/BallAnimation";

export default async function StartScreen() {
  // Server-side session check
  const session = await auth();
  if (!session) {
    redirect("/");
  }

  return (
    <>
      <Header display="navbar" />
      <main className="flex flex-col items-center min-h-screen bg-gray-900">
        <h2>Start a New Game</h2>
        <span className="text-white italic">
          BounceBack is a single-player twist on the classic Pong game. Use your
          paddles to bounce the ball back and score points!
        </span>
        <BallAnimation />
      </main>
    </>
  );
}
