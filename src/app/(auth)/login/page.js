import LoginForm from "../../../components/LoginForm";
import Header from "../../../components/Header";
import { auth } from "../../../auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  // Auth check
  const session = await auth();
  if (session) {
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
