import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import GameOverCard from "@/components/GameOverCard";

export default async function GameOver() {
  const session = await auth();
  if (!session) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header display="navbar" />
      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4">
        <h2>Game Over!</h2>
        <Link href="/game/play">
          <button className="mb-2 px-4 py-2 text-white bg-pink-600 border-2 border-gray-800 rounded-lg cursor-pointer">
            Play Again?
          </button>
        </Link>
        <GameOverCard />
      </main>
    </div>
  );
}
