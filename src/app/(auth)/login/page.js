import LoginForm from "../../../components/LoginForm";
import Header from "../../../components/Header";
import { auth } from "../../../auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  // Auth check
  const session = await auth();
  let guestId = null;
  if (!session) {
    const cookieStore = await cookies();
    guestId = cookieStore.get("guestId")?.value;
  }

  // Redirect users and guests
  if (session || guestId) {
    redirect("/game");
  }

  return (
    <>
      <Header display="welcome" />
      <main className="p-4">
        <LoginForm />
      </main>
    </>
  );
}
