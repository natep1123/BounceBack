import { redirect } from "next/navigation";
import { auth } from "@/auth";
import Header from "@/components/Header";
import Link from "next/link";

export default async function AboutGame() {
  // Server-side session check
  const session = await auth();
  if (!session) {
    redirect("/");
  }

  return (
    <>
      <Header display="navbar" title="BounceBack!" />
      <main className="flex flex-col items-center min-h-screen bg-gray-900 mt-4">
        <h2 className="text-3xl font-bold text-white">About the Game</h2>
        <div className="w-full max-w-2xl p-8 mt-4 bg-gray-800 rounded-lg shadow-lg shadow-pink-500/20">
          <div className="text-gray-200 space-y-4">
            <p>
              BounceBack! is a modern twist on the classic Pong game, designed
              for solo play. Test your reflexes as you keep the ball in play
              against a dynamic environment.
            </p>
            <p>
              With a sleek interface and responsive controls, BounceBack! offers
              a fun and challenging experience for players of all skill levels.
            </p>
            <p>
              Whether you're aiming for a high score or just enjoying the retro
              vibes, BounceBack! is all about having fun and pushing your
              limits.
            </p>
            <p>Thank you for playing!</p>
          </div>
        </div>
        <Link className="mt-4 text-orange-400 font-medium" href="/about/dev">
          About the Developer
        </Link>
      </main>
    </>
  );
}
