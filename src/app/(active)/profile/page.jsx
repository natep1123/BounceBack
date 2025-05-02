import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { cookies } from "next/headers";
import { AuthProvider } from "../../contexts/AuthContext";
import Profile from "@/components/profile/Profile";

export default async function ProfilePage() {
  let isGuest = false;
  let username = "guest";
  let email = null;

  // Auth check
  const session = await auth();
  if (session?.user) {
    username = session.user.username;
    email = session.user.email;
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
    <AuthProvider isGuest={isGuest} username={username} email={email}>
      <Profile />
    </AuthProvider>
  );
}
