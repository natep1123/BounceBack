import RegisterForm from "../../../components/RegisterForm";
import { auth } from "@/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function RegisterPage() {
  // Auth check
  const session = await auth();
  if (session) {
    redirect("/game");
  }
  const cookieStore = await cookies();
  const guestId = cookieStore.get("guestId")?.value || null;

  return (
    <>
      <main className="p-4">
        <RegisterForm guestId={guestId} />
      </main>
    </>
  );
}
