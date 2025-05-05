import { auth } from "@/auth";
import Game from "@/components/game/Game";
import { AuthProvider } from "../../../contexts/AuthContext";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function GamePage() {
  let isGuest = false;
  let username = "guest";

  // Auth check
  const session = await auth();
  if (session?.user) {
    username = session.user.username;
  } else {
    isGuest = true;
    // Check for guest ID cookie
    const cookieStore = await cookies();
    const guestId = cookieStore.get("guestId")?.value;

    if (!guestId) {
      // Redirect to home if no guestId or session
      redirect("/");
    }
  }

  return (
    <AuthProvider isGuest={isGuest} username={username}>
      <Game />
    </AuthProvider>
  );
}
