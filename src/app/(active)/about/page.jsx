import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import About from "@/components/about/About";

export default async function AboutPage() {
  // Auth check
  const session = await auth();
  if (!session) {
    // If no session, check for guest ID cookie
    const cookieStore = await cookies();
    const guestId = cookieStore.get("guestId")?.value;

    if (!guestId) {
      redirect("/");
    }
  }

  return <About />;
}
