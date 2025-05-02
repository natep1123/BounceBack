import { connectDB } from "@/lib/db";
import User from "@/models/User";
import GuestUser from "@/models/GuestUser";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import Score from "@/models/Score";
import bcrypt from "bcryptjs";

// This route handles user registration and promoting guests to users.
export async function POST(req) {
  try {
    const { username, email, password } = await req.json();

    // Validate input
    if (!username || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }

    await connectDB();

    // Check for existing username
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return NextResponse.json(
        { message: "Username already taken." },
        { status: 400 }
      );
    }

    // Check for existing email
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return NextResponse.json(
        { message: "Email already in use." },
        { status: 400 }
      );
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    const newUserId = newUser._id;

    // Check for guest cookie
    const cookieStore = await cookies();
    const guestId = cookieStore.get("guestId").value;

    if (guestId) {
      // Find guest user and promote to registered user
      const guestUser = await GuestUser.findOne({ guestId });
      if (guestUser) {
        // Save guest scores
        guestUser.topScores.forEach(async (score) => {
          const newScore = new Score({
            user: newUserId,
            score,
          });
          await newScore.save();
        });
      }
      // Remove guestId cookie
      cookieStore.delete("guestId");
      // Delete guest user
      await GuestUser.deleteOne({ guestId });
    }

    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}
