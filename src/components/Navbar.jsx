"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

export default function NavBar({ setGameState, setScore }) {
  const router = useRouter();

  /* NextAuth v5's signOut with callbackUrl="/" failed to redirect, causing the browser to spin in refresh. Using redirect: false and manual router.push("/") resolved the issue. */
  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Adds functionality to return to start screen from over screen by clicking 'start' nav link.
  const handleStartClick = () => {
    if (setGameState && setScore) {
      // Functionss will only exist if clicking 'start' from OverScreen.
      setGameState("start");
      setScore(0);
    } else return;
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
              onClick={() => handleStartClick()}
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
