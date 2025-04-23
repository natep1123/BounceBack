import { redirect } from "next/navigation";
import { auth } from "@/auth";
import Header from "@/components/Header";
import LeaderboardCard from "@/components/LeaderboardCard";

export default async function LeaderboardPage() {
  // Auth check
  const session = await auth();
  if (!session) {
    redirect("/");
  }
  return (
    <>
      <Header display="navbar" />
      <main className="flex flex-col items-center mb-2">
        <h2>Leaderboard</h2>
        <LeaderboardCard />
      </main>
    </>
  );
}
