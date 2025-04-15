import { auth } from "@/auth";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/Logout-Button";

export default async function StartScreen() {
  // Server-side session check
  const session = await auth();
  if (!session) {
    redirect("/"); // Redirect to login if not authenticated
  }

  return (
    <main>
      <h1>Welcome to BounceBack!</h1>
      <p>
        BounceBack is a single-player twist on the classic Pong game. Use your
        paddles to bounce the ball back and score points!
      </p>
      <LogoutButton />
    </main>
  );
}
