import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Game from "@/components/Game";

export default async function GamePage() {
  // Server-side session check
  const session = await auth();
  if (!session) {
    redirect("/");
  }

  return <Game />;
}
