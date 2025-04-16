"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";

export default function NavBar() {
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <nav className="py-4 border-t-2 border-pink-600">
      <ul className="flex items-center justify-around">
        <li>
          <Link href="/profile" className="text-orange-300">
            Profile
          </Link>
        </li>
        <li>
          <Link href="/leaderboard" className="text-orange-300">
            Leaderboard
          </Link>
        </li>
        <li>
          <Link href="/start" className="text-orange-300">
            Start
          </Link>
        </li>
        <li>
          <Link href="/about/game" className="text-orange-300">
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
