import { redirect } from "next/navigation";
import { auth } from "@/auth";
import Header from "@/components/Header";
import UserProfileCard from "@/components/UserProfileCard";

export default async function Profile() {
  // Server-side session check
  const session = await auth();
  if (!session) {
    redirect("/");
  }

  const username = session.user.username;
  const email = session.user.email;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header display="navbar" />
      <main className="flex flex-col items-center min-h-[calc(100vh-4rem)] px-4">
        <h2>{username}'s Profile</h2>
        <UserProfileCard username={username} email={email} />
      </main>
    </div>
  );
}
