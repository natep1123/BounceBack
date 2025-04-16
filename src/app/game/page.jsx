import LogoutButton from "@/components/Logout-Button";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Game() {
  // Server-side session check
  const session = await auth();
  if (!session) {
    redirect("/"); // Redirect to login if not authenticated
  }
  return (
    <main>
      <LogoutButton />
    </main>
  );
}
