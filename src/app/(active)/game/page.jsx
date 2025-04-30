import { auth } from "@/auth";
import Game from "@/components/game/Game";

export default async function GamePage() {
  let isGuest = false;
  // Auth check
  const session = await auth();
  if (!session) {
    isGuest = true;
  }
  return <Game isGuest={isGuest} />;
}
