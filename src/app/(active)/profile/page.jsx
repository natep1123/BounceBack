import { redirect } from "next/navigation";
import { auth } from "@/auth";
import Profile from "@/components/profile/Profile";

export default async function ProfilePage() {
  // Auth check
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  const username = session.user.username;
  const email = session.user.email;

  return <Profile username={username} email={email} />;
}
