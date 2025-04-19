import { NextResponse } from "next/server";
import Score from "@/models/Score";
import { auth } from "@/auth";
import { connectDB } from "@/lib/db";

export async function GET() {
  try {
    await connectDB();

    // Get user ID from session
    const session = await auth();
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;

    // Fetch the most recent score
    const latestScore = await Score.findOne({ user: userId })
      .sort({ createdAt: -1 }) // Most recent first
      .lean();

    if (!latestScore) {
      return NextResponse.json(
        { message: "No scores found", score: 0 },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "Final score retrieved", score: latestScore.score },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching latest score:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
