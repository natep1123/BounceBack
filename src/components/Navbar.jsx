"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { checkGuest, logoutGuest } from "@/lib/dbLogic";
import { useGameContext } from "@/contexts/GameContext";

export default function NavBar() {
  const router = useRouter();
  const { setGameState } = useGameContext();

  const handleLogout = async () => {
    const response = await checkGuest(); // Returns string "true" or "false"
    const isGuest = response === "true"; // Convert to boolean

    // Logout
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
          <Link
            href="/profile"
            className="text-orange-300 inline-block px-2 hover:underline"
          >
            Profile
          </Link>
        </li>
        <li className="flex-1 text-center">
          <Link
            href="/leaderboard"
            className="text-orange-300 inline-block px-2 hover:underline"
          >
            Leaderboard
          </Link>
        </li>
        <li className="flex-1 text-center">
          <Link
            href="/game"
            onClick={() => setGameState("start")}
            className="flex items-center justify-center"
          >
            <img
              src="logo.png"
              alt="Start"
              className="h-10 w-auto object-contain"
            />
          </Link>
        </li>
        <li className="flex-1 text-center">
          <Link
            href="/about"
            className="text-orange-300 inline-block px-2 hover:underline"
          >
            About
          </Link>
        </li>
        <li className="flex-1 text-center">
          <button
            onClick={handleLogout}
            className="text-orange-300 cursor-pointer inline-block px-2 hover:underline"
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}
