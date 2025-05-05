import RegisterForm from "../../../components/RegisterForm";
import { auth } from "@/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function RegisterPage() {
  // Auth check for only loggin-in users; guests can promote to users
  const session = await auth();
  let isGuest = false;
  if (session) {
    redirect("/game");
  } else {
    const cookieStore = cookies();
    const guestId = cookieStore.get("guestId")?.value || null;
    isGuest = guestId ? true : false;
  }

  return (
    <main className="p-4">
      <RegisterForm isGuest={isGuest} />
    </main>
  );
}
