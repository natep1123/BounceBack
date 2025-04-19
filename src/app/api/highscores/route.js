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

    // Fetch top 5 scores
    const topScores = await Score.find({ user: userId })
      .sort({ score: -1 }) // Highest score first
      .limit(5)
      .lean();

    // Delete scores beyond the top 5
    const scoreIdsToKeep = topScores.map((score) => score._id);
    await Score.deleteMany({
      user: userId,
      _id: { $nin: scoreIdsToKeep },
    });

    return NextResponse.json(
      {
        message: "Top scores retrieved",
        scores: topScores.map((score) => ({
          score: score.score,
          createdAt: score.createdAt,
        })),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching high scores:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
