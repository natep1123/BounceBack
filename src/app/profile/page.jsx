import { redirect } from "next/navigation";
import { auth } from "@/auth";
import Header from "@/components/Header";

export default async function Profile() {
  // Server-side session check
  const session = await auth();
  if (!session) {
    redirect("/"); // Redirect to login if not authenticated
  }

  const username = session.user.username;
  const email = session.user.email;

  return (
    <>
      <Header display="navbar" title="BounceBack!" />
      <main className="flex flex-col items-center h-screen">
        <h2>{username}'s Profile</h2>
        <div className="flex flex-col items-center rounded-lg shadow-lg p-6 w-full max-w-md">
          <p className="text-white">User content goes here.</p>
        </div>
      </main>
    </>
  );
}
