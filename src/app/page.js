import Image from "next/image";
import HeaderLinks from "@/components/HeaderLinks";
import { auth } from "@/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function HomePage() {
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
    <div className="flex flex-col items-center min-h-screen bg-gray-900 p-4">
      <Image
        src="/logo.png"
        alt="Logo"
        height={775}
        width={517}
        className="h-32 w-auto mt-8 mb-6"
      />
      <h2 className="text-4xl font-bold text-gray-200 mb-4">
        Welcome to the Game!
      </h2>
      <p className="text-lg text-gray-400 mb-8 text-center max-w-md">
        Join the fun! Log in to save your progress, register for an account, or
        play as a guest.
      </p>
      <HeaderLinks />
    </div>
  );
}
