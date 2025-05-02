"use client";

import Link from "next/link";
import { createGuestUser } from "@/lib/dbLogic";
import { useRouter } from "next/navigation";

export default function HeaderLinks() {
  const router = useRouter();

  const handleGuestLogin = async () => {
    const guestUser = await createGuestUser();
    if (guestUser) {
      router.push("/game");
    } else {
      console.error("Failed to create guest user");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Link
        href="/login"
        className="bg-pink-600 text-white font-bold rounded-md px-6 py-3 text-center"
      >
        Login
      </Link>
      <Link
        href="/register"
        className="bg-gray-700 text-white font-bold rounded-md px-6 py-3 text-center"
      >
        Register
      </Link>
      <button
        onClick={handleGuestLogin}
        className="bg-purple-600 text-white font-bold rounded-md px-6 py-3 text-center cursor-pointer"
      >
        Play as Guest
      </button>
    </div>
  );
}
