import { redirect } from "next/navigation";
import { auth } from "@/auth";
import Header from "@/components/Header";
import LeaderboardCard from "@/components/LeaderboardCard";

export default async function Leaderboard() {
  // Server-side session check
  const session = await auth();
  if (!session) {
    redirect("/"); // Redirect to login if not authenticated
  }
  return (
    <>
      <Header display="navbar" />
      <main className="flex flex-col items-center h-screen">
        <h2>Leaderboard</h2>
        <LeaderboardCard />
      </main>
    </>
  );
}
