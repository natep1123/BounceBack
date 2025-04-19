import { redirect } from "next/navigation";
import { auth } from "@/auth";
import Header from "@/components/Header";
import AboutGameCard from "@/components/AboutGameCard";

export default async function AboutGame() {
  // Server-side session check
  const session = await auth();
  if (!session) {
    redirect("/");
  }

  return (
    <>
      <Header display="navbar" />
      <main className="flex flex-col items-center min-h-screen bg-gray-900">
        <h2>About the Game</h2>
        <AboutGameCard />
      </main>
    </>
  );
}
