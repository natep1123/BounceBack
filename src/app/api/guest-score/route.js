import { connectDB } from "@/lib/db";
import GuestUser from "@/models/GuestUser";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// This API route handles saving guest scores to the database
export async function POST(req) {
  try {
    const { score } = await req.json();

    // Validate score
    if (!Number.isInteger(score) || score < 0) {
      return NextResponse.json(
        { message: "Score must be a non-negative integer." },
        { status: 400 }
      );
    }

    // Get guestId from cookie
    const cookieStore = await cookies();
    const guestId = cookieStore.get("guestId")?.value;

    if (!guestId) {
      return NextResponse.json(
        {
          message: "Guest session not found. Please start a new guest session.",
        },
        { status: 401 }
      );
    }

    // Connect to database
    await connectDB();

    // Find GuestUser
    const guestUser = await GuestUser.findOne({ guestId });
    if (!guestUser) {
      return NextResponse.json(
        { message: "Guest user not found. Please start a new guest session." },
        { status: 404 }
      );
    }

    console.log("Score", score, "Guest", guestUser);

    // Update topScores (keep top 5)
    guestUser.topScores.push(score);
    guestUser.topScores.sort((a, b) => b - a); // Sort descending (numbers)
    if (guestUser.topScores.length > 5) {
      guestUser.topScores = guestUser.topScores.slice(0, 5); // Keep top 5
    }
    guestUser.lastActive = new Date();
    await guestUser.save();

    return NextResponse.json(
      { message: "Guest score saved successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving guest score:", error);
    return NextResponse.json(
      { message: "An error occurred while saving the guest score." },
      { status: 500 }
    );
  }
}
