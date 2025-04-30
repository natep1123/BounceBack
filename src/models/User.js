import mongoose from "mongoose";

// User schema supporting both guest and registered users
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      sparse: true, // Allows multiple null values for guests
      minlength: [3, "Username must be at least 3 characters long"],
      maxlength: [20, "Username cannot exceed 20 characters"],
      required: [
        function () {
          return !this.isGuest;
        },
        "Username is required for registered users",
      ],
    },
    email: {
      type: String,
      unique: true,
      sparse: true, // Allows multiple null values for guests
      required: [
        function () {
          return !this.isGuest;
        },
        "Email is required for registered users",
      ],
    },
    password: {
      type: String,
      required: [
        function () {
          return !this.isGuest;
        },
        "Password is required for registered users",
      ],
    },
    isGuest: {
      type: Boolean,
      default: false,
    },
    guestId: {
      type: String,
      unique: true,
      sparse: true, // Allows null for registered users
      required: [
        function () {
          return this.isGuest;
        },
        "Guest ID is required for guest users",
      ],
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
