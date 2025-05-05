"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { checkGuest, logoutGuest } from "@/lib/dbLogic";

export default function NavBar() {
  const router = useRouter();

  const handleLogout = async () => {
    const response = await checkGuest(); // Returns string "true" or "false"
    const isGuest = response === "true"; // Convert to boolean
    try {
      if (isGuest) {
        await logoutGuest();
      } else {
        // If user, sign out
        await signOut({ redirect: false });
      }
      // Redirect to home
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="py-2 border-t-2 border-pink-600">
      <ul className="flex items-center justify-between w-full">
        <li className="flex-1 text-center">
          <Link href="/profile" className="text-orange-300 inline-block px-2">
            Profile
          </Link>
        </li>
        <li className="flex-1 text-center">
          <Link
            href="/leaderboard"
            className="text-orange-300 inline-block px-2"
          >
            Leaderboard
          </Link>
        </li>
        <li className="flex-1 text-center">
          <Link href="/game" className="flex items-center justify-center">
            <img
              src="logo.png"
              alt="Start"
              className="h-10 w-auto object-contain"
            />
          </Link>
        </li>
        <li className="flex-1 text-center">
          <Link href="/about" className="text-orange-300 inline-block px-2">
            About
          </Link>
        </li>
        <li className="flex-1 text-center">
          <button
            onClick={handleLogout}
            className="text-orange-300 cursor-pointer inline-block px-2"
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}
