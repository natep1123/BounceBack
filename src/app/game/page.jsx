import { auth } from "@/auth";
import { redirect } from "next/navigation";
import ClientGame from "@/components/ClientGame";
import Header from "@/components/Header";

export default async function Game() {
  // Server-side session check
  const session = await auth();
  if (!session) {
    redirect("/"); // Redirect to login if not authenticated
  }
  return (
    <>
      <Header display="game" />
      <main className="flex flex-col items-center min-h-screen bg-gray-900">
        <ClientGame />
      </main>
    </>
  );
}
