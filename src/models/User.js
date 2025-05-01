import mongoose from "mongoose";

// This is schema for users.
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      minlength: [3, "Username must be at least 3 characters long"],
      maxlength: [20, "Username cannot exceed 20 characters"],
      required: [true, "Username is required."],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required."],
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
