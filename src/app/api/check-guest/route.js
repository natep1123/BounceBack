import { cookies } from "next/headers";

// This function checks if a guest ID cookie exists and returns it.
export async function GET() {
  const cookieStore = cookies();
  const guestId = cookieStore.get("guestId")?.value || null;

  if (!guestId) {
    return new Response(JSON.stringify({ message: "No guest ID found." }), {
      status: 404,
    });
  }

  return new Response(JSON.stringify({ message: "Guest exists.", guestId }), {
    status: 200,
  });
}
