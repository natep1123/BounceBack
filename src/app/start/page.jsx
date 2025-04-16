import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import BallAnimation from "@/components/BallAnimation";

export default async function StartScreen() {
  // Server-side session check
  const session = await auth();
  if (!session) {
    redirect("/"); // Redirect to login if not authenticated
  }

  return (
    <>
      <Header display="navbar" title="BounceBack!" />
      <main className="flex flex-col items-center min-h-screen bg-gray-900">
        <h2 className="mt-2 mb-2 text-2xl font-bold text-white">
          Start Screen
        </h2>
        <span className="text-white italic">
          BounceBack is a single-player twist on the classic Pong game. Use your
          paddles to bounce the ball back and score points!
        </span>
        <BallAnimation />
        <Link href="/game">
          <button className="mt-4 px-4 py-2 text-white bg-pink-600 border-2 border-gray-800 rounded-lg cursor-pointer">
            Start!
          </button>
        </Link>
      </main>
    </>
  );
}
