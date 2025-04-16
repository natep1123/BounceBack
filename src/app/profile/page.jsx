import { redirect } from "next/navigation";
import { auth } from "@/auth";
import Header from "@/components/Header";

export default async function Leaderboard() {
  // Server-side session check
  const session = await auth();
  if (!session) {
    redirect("/"); // Redirect to login if not authenticated
  }
  console.log(session);
  return (
    <>
      <Header display="navbar" />
      <main className="flex flex-col items-center h-screen">
        <h2 className="text-4xl font-bold text-white mb-4">
          {session.user.username}
        </h2>
        <div className="flex flex-col items-center rounded-lg shadow-lg p-6 w-full max-w-md">
          <p className="text-white">User content goes here.</p>
        </div>
      </main>
    </>
  );
}
