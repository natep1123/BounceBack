"use client";

import { GameProvider } from "../contexts/GameContext";
import Header from "@/components/Header";

export default function ClientLayout({ children }) {
  return (
    <GameProvider>
      <Header />
      {children}
    </GameProvider>
  );
}
