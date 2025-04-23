import { NextResponse } from "next/server";
import Score from "@/models/Score";
import { auth } from "@/auth";
import { connectDB } from "@/lib/db";

// This function handles saving a score for a user.
export async function POST(request) {
  try {
    // Get user ID from session
    const session = await auth();
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;

    await connectDB();

    // Get the score from the request body
    const { score } = await request.json();
    if (typeof score !== "number" || score < 0) {
      return NextResponse.json({ error: "Invalid score" }, { status: 400 });
    }

    // Save the score
    const newScore = new Score({
      user: userId,
      score,
    });
    await newScore.save();

    return NextResponse.json(
      { message: "Score saved", score },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving score:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
