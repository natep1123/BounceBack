import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Header from "@/components/Header";
import FinalScore from "@/components/FinalScore";

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
        <FinalScore />
      </main>
    </>
  );
}
