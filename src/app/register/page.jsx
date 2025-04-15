import RegisterForm from "../../components/RegisterForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Register() {
  // Server-side check before rendering client component
  const session = await auth();
  if (session) {
    redirect("/start");
  }
  return <RegisterForm />;
}
