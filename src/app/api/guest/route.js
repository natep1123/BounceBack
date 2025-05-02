import { connectDB } from "@/lib/db";
import GuestUser from "@/models/GuestUser";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

// This API route creates a new guest user and sets a cookie with the guest ID.
export async function POST() {
  try {
    await connectDB();
    const guestId = uuidv4();
    await GuestUser.create({ guestId, topScores: [] });

    const response = NextResponse.json(
      { message: "Guest user created.", guestId },
      { status: 201 }
    );
    response.cookies.set("guestId", guestId, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Error creating guest user:", error);
    return NextResponse.json(
      { message: "An error occurred while creating guest user." },
      { status: 500 }
    );
  }
}
