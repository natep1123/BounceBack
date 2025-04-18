import RegisterForm from "../../components/RegisterForm";
import { auth } from "@/auth";
import Header from "@/components/Header";
import { redirect } from "next/navigation";

export default async function Register() {
  // Server-side check before rendering client component
  const session = await auth();
  if (session) {
    redirect("/game/start");
  }
  return (
    <>
      <Header display="welcome" />
      <main>
        <RegisterForm />
      </main>
    </>
  );
}
