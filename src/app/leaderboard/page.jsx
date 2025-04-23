import { redirect } from "next/navigation";
import { auth } from "@/auth";
import Header from "@/components/Header";
import LeaderboardCard from "@/components/LeaderboardCard";

export default async function LeaderboardPage() {
  // No auth, so guests can access
  return (
    <>
      <Header display="navbar" />
      <main className="flex flex-col items-center p-4">
        <h2>Leaderboard</h2>
        <LeaderboardCard />
      </main>
    </>
  );
}
