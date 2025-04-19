import { redirect } from "next/navigation";
import { auth } from "@/auth";
import Header from "@/components/Header";
import AboutDevCard from "@/components/AboutDevCard";

export default async function AboutDev() {
  // Server-side session check
  const session = await auth();
  if (!session) {
    redirect("/");
  }

  return (
    <>
      <Header display="navbar" />
      <main className="flex flex-col items-center min-h-screen bg-gray-900">
        <h2>About the Developer</h2>
        <AboutDevCard />
      </main>
    </>
  );
}
