import mongoose from "mongoose";

// Schema for guest users to store top 5 scores
const guestUserSchema = new mongoose.Schema(
  {
    guestId: {
      type: String,
      unique: true,
      required: [true, "Guest ID is required."],
    },
    topScores: [
      {
        type: Number,
        required: true,
      },
    ],
    lastActive: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Pre save hook to delete non-active guests after 30 days
guestUserSchema.pre("save", async function (next) {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  await this.model("GuestUser").deleteMany({
    lastActive: { $lt: thirtyDaysAgo },
  });
  next();
});

const GuestUser =
  mongoose.models.GuestUser || mongoose.model("GuestUser", guestUserSchema);
export default GuestUser;
