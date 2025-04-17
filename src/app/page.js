import LoginForm from "@/components/LoginForm";
import Header from "@/components/Header";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  // Server-side check before rendering client component
  const session = await auth();
  if (session) {
    redirect("/game/start");
  }
  return (
    <>
      <Header display="welcome" />
      <main>
        <LoginForm />
      </main>
    </>
  );
}
