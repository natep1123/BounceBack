"use client";

import { useState } from "react";
import AboutGameCard from "./AboutGameCard";
import AboutDevcard from "./AboutDevCard";

export default function About() {
  const [aboutState, setAboutState] = useState("game");

  return (
    <>
      <main className="flex flex-col items-center min-h-screen bg-gray-900 p-4">
        {aboutState === "game" && (
          <AboutGameCard setAboutState={setAboutState} />
        )}
        {aboutState === "dev" && <AboutDevcard setAboutState={setAboutState} />}
      </main>
    </>
  );
}
