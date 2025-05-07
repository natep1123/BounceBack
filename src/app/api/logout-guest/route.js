import { cookies } from "next/headers";
import GuestUser from "@/models/GuestUser";

// This function logs out a guest, deleting the guest user and cookie.
export async function GET() {
  const cookieStore = await cookies();
  const guestId = cookieStore.get("guestId")?.value || null;

  if (!guestId) {
    return new Response(JSON.stringify({ message: "No guest ID found." }), {
      status: 404,
    });
  }

  // Delete guest user from the database
  await GuestUser.findOneAndDelete({ guestId });

  // Delete guest cookie
  cookieStore.delete("guestId", { path: "/" });

  return new Response(JSON.stringify({ message: "Guest logged out" }), {
    status: 200,
  });
}
