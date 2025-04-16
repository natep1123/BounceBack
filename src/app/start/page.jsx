import { auth } from "@/auth";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/Logout-Button";
import Header from "@/components/Header";

export default async function StartScreen() {
  // Server-side session check
  const session = await auth();
  if (!session) {
    redirect("/"); // Redirect to login if not authenticated
  }

  return (
    <>
      <Header display="navbar" title="BounceBack!" />
      <main className="flex flex-col items-center min-h-screen">
        <h2 className="text-2xl font-bold text-white mb-4">Start Screen</h2>
        <div className="flex flex-col items-center rounded-lg shadow-lg p-6 w-full max-w-md">
          <p className="text-white">
            BounceBack is a single-player twist on the classic Pong game. Use
            your paddles to bounce the ball back and score points!
          </p>
        </div>
        <LogoutButton />
      </main>
    </>
  );
}
