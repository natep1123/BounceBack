import mongoose from "mongoose";

// This is the schema for the Score model.
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

const Score = mongoose.models.Score || mongoose.model("Score", scoreSchema);
export default Score;
