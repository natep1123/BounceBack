"use client";

import { usePathname } from "next/navigation";
import { useGameContext } from "@/contexts/GameContext";
import Navbar from "./Navbar";

const Header = () => {
  const pathname = usePathname();
  const { gameState } = useGameContext();
  const welcomePages = ["/", "/login", "/register"];
  const navbarPages = ["/profile", "/leaderboard", "/game", "/about"];

  // Prevent header display during game play
  if (pathname === "/game" && gameState === "play") {
    return null;
  }

  // Welcome Display
  if (welcomePages.includes(pathname)) {
    return (
      <header className="border-b-2 border-pink-600 text-center">
        <h1>Welcome to BounceBack!</h1>
      </header>
    );
  }

  // Navbar Display
  if (navbarPages.includes(pathname)) {
    return (
      <header className="border-b-2 border-pink-600 text-center">
        <h1>BounceBack!</h1>
        <Navbar />
      </header>
    );
  }

  return null; // Fallback if no conditions match
};

export default Header;
