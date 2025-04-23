import { redirect } from "next/navigation";
import { auth } from "@/auth";
import Header from "@/components/Header";
import Profile from "@/components/profile/Profile";

export default async function ProfilePage() {
  // Auth check
  const session = await auth();
  if (!session) {
    redirect("/");
  }

  const username = session.user.username;
  const email = session.user.email;

  return <Profile username={username} email={email} />;
}
