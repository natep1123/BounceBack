import mongoose from "mongoose";

const scoreSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

// Index for efficient leaderboard queries
scoreSchema.index({ score: -1 }); // Descending index for sorting high scores
// Index for user-specific queries
scoreSchema.index({ user: 1, score: -1 }); // Composite index for user score lookups

const Score = mongoose.models.Score || mongoose.model("Score", scoreSchema);
export default Score;
