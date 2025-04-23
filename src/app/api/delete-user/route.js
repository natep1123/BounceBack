import { connectDB } from "@/lib/db";
import User from "@/models/User";
import Score from "@/models/Score";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { signOut } from "@/auth";

// This route handles the deletion of a user account and all associated scores.
export async function DELETE(req) {
  try {
    // Get user ID from session
    const session = await auth();
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;

    await connectDB();

    // Delete all scores associated with the user
    await Score.deleteMany({ user: userId });

    // Delete the user
    await User.findByIdAndDelete(userId);

    // Sign out the user
    await signOut({ redirect: false });

    return NextResponse.json(
      { message: "Account and associated scores deleted successfully." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while deleting the account." },
      { status: 500 }
    );
  }
}
