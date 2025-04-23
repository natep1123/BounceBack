"use client";

import { useEffect, useState } from "react";
import ClientGame from "./ClientGame";
import MobileClientGame from "./MobileClientGame";
import Header from "@/components/Header";

export default function PlayScreen({ setGameState, score, setScore }) {
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device based on window width
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Mobile threshold at 768px
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-900 mb-2">
        {isMobile ? (
          <MobileClientGame
            setGameState={setGameState}
            score={score}
            setScore={setScore}
          />
        ) : (
          <ClientGame
            setGameState={setGameState}
            score={score}
            setScore={setScore}
          />
        )}
      </main>
    </>
  );
}
