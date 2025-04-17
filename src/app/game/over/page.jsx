import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Header from "@/components/Header";

export default async function GameOver() {
  // Server-side session check
  const session = await auth();
  if (!session) {
    redirect("/");
  }

  return (
    <>
      <Header display="navbar" />
      <main className="flex flex-col items-center min-h-screen">
        <h2>Game Over!</h2>
        <div className="flex flex-col items-center rounded-lg shadow-lg p-6 w-full max-w-md">
          <p className="text-white">
            BounceBack is a single-player twist on the classic Pong game. Use
            your paddles to bounce the ball back and score points!
          </p>
        </div>
      </main>
    </>
  );
}
