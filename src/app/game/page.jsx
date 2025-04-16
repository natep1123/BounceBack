import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Game() {
  // Server-side session check
  const session = await auth();
  if (!session) {
    redirect("/"); // Redirect to login if not authenticated
  }
  return (
    <>
      <main className="flex flex-col items-center min-h-screen">
        <h2 className="text-2xl font-bold text-white mb-4">Game Screen</h2>
        <div className="flex flex-col items-center rounded-lg shadow-lg p-6 w-full max-w-md">
          <p className="text-white">Game content here.</p>
        </div>
      </main>
    </>
  );
}
