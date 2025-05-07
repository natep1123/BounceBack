import { cookies } from "next/headers";

// This function checks if a guest ID cookie exists and returns it.
export async function GET() {
  const cookieStore = await cookies();
  const guestId = cookieStore.get("guestId")?.value || null;

  if (!guestId) {
    return new Response(JSON.stringify({ message: "false" }), {
      status: 200,
    });
  }

  return new Response(JSON.stringify({ message: "true" }), {
    status: 200,
  });
}
