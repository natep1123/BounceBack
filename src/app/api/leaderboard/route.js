import { NextResponse } from "next/server";
import Score from "@/models/Score";
import { connectDB } from "@/lib/db";

// This route handles the retrieval of top 10 scores across all users.
export async function GET() {
  try {
    await connectDB();

    // Fetch top 10 scores across all users, populating the user field for username
    const topScores = await Score.find({})
      .sort({ score: -1 }) // Highest score first
      .limit(10)
      .populate("user", "username") // Populate user field, selecting only username
      .lean();

    // Map scores to include score, username, and createdAt
    const formattedScores = topScores.map((score) => ({
      score: score.score,
      username: score.user?.username || "Unknown",
      createdAt: score.createdAt,
    }));

    return NextResponse.json(
      {
        message: "All-time top scores retrieved",
        scores: formattedScores,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching leaderboard scores:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
