import { cookies } from "next/headers";
import GuestUser from "@/models/GuestUser";
import next from "next";

// This function logs out a guest, deleting the guest user and cookie.
export async function GET() {
  const cookieStore = await cookies();
  const guestId = cookieStore.get("guestId")?.value || null;

  if (!guestId) {
    return new Response(JSON.stringify({ message: "No guest ID found." }), {
      status: 404,
    });
  }

  // Delete guest cookie by setting an expired date
  cookieStore.set("guestId", "", { expires: new Date(0), path: "/" });

  // Delete guest user from the database if exists
  const guestUser = (await GuestUser.findOne({ guestId })) || null;
  guestUser ? await guestUser.deleteOne({ guestId }) : next();

  return new Response(JSON.stringify({ message: "Guest logged out" }), {
    status: 200,
  });
}
