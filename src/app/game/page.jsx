import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Game from "@/components/game/Game";

export default async function GamePage() {
  // Auth check
  const session = await auth();
  if (!session) {
    redirect("/");
  }

  return <Game />;
}
