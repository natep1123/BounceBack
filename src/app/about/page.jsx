import { redirect } from "next/navigation";
import { auth } from "@/auth";
import About from "@/components/about/About";

export default async function AboutGame() {
  // Server-side session check
  const session = await auth();
  if (!session) {
    redirect("/");
  }

  return <About />;
}
