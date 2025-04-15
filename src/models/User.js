import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true, // Implicitly creates a unique index
    },
    email: {
      type: String,
      required: true,
      unique: true, // Implicitly creates a unique index
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Explicitly define indexes for clarity and future customization
userSchema.index({ username: 1 }, { unique: true }); // Unique index for username lookups
userSchema.index({ email: 1 }, { unique: true }); // Unique index for email lookups

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
