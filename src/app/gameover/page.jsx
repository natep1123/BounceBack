import { auth } from "@/auth";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/Logout-Button";
import Header from "@/components/Header";

export default async function GameOver() {
  // Server-side session check
  const session = await auth();
  if (!session) {
    redirect("/"); // Redirect to login if not authenticated
  }

  return (
    <>
      <Header display="navbar" />
      <main>
        <h2>Game Over!</h2>
        <p>
          BounceBack is a single-player twist on the classic Pong game. Use your
          paddles to bounce the ball back and score points!
        </p>
        <LogoutButton />
      </main>
    </>
  );
}
