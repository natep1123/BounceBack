import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { cookies } from "next/headers";
import LeaderboardCard from "@/components/LeaderboardCard";

export default async function LeaderboardPage() {
  // Auth check
  const session = await auth();
  const username = session?.user?.username || null;
  if (!session) {
    // If no session, check for guest ID cookie
    const cookieStore = await cookies();
    const guestId = cookieStore.get("guestId")?.value;

    if (!guestId) {
      redirect("/");
    }
  }

  return (
    <main className="flex flex-col items-center p-4">
      <h2>Leaderboard</h2>
      <LeaderboardCard username={username} />
    </main>
  );
}
