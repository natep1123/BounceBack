import { NextResponse } from "next/server";
import Score from "@/models/Score";
import { auth } from "@/auth";
import { connectDB } from "@/lib/db";

export async function POST(request) {
  try {
    await connectDB();

    // Get user ID from session (adjust based on your auth setup)
    const session = await auth();
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;

    // Get the new score from the request body
    const { score } = await request.json();
    if (typeof score !== "number" || score < 0) {
      return NextResponse.json({ error: "Invalid score" }, { status: 400 });
    }

    // Fetch all scores for the user, sorted by score in descending order
    const userScores = await Score.find({ user: userId })
      .sort({ score: -1 })
      .limit(5)
      .lean();

    // Check if the new score qualifies for top 5
    const scoreCount = userScores.length;
    if (scoreCount < 5 || score > userScores[scoreCount - 1].score) {
      // Save the new score
      const newScore = new Score({
        user: userId,
        score,
      });
      await newScore.save();

      // If there are 5 or more scores, remove the lowest
      if (scoreCount >= 5) {
        const lowestScore = await Score.findOne({ user: userId })
          .sort({ score: 1 }) // Sort ascending to get lowest
          .limit(1);
        if (lowestScore) {
          await Score.deleteOne({ _id: lowestScore._id });
        }
      }

      return NextResponse.json(
        { message: "Score saved", score },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "Score not in top 5" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing score:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
