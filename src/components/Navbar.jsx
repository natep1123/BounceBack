"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

export default function NavBar() {
  const router = useRouter();

  /* NextAuth v5's signOut with callbackUrl="/" failed to redirect, causing the browser to spin in refresh. Using redirect: false and manual router.push resolved the issue. */
  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="py-4 border-t-2 border-pink-600">
      <ul className="flex items-center justify-around">
        <li>
          <Link href="/game/profile" className="text-orange-300">
            Profile
          </Link>
        </li>
        <li>
          <Link href="/game/leaderboard" className="text-orange-300">
            Leaderboard
          </Link>
        </li>
        <li>
          <Link href="/game/start" className="text-orange-300">
            Start
          </Link>
        </li>
        <li>
          <Link href="/game/about" className="text-orange-300">
            About
          </Link>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className="text-orange-300 cursor-pointer"
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}
