import { getToken } from "next-auth/jwt";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { userId } = await req.json();

    await connectMongoDB();
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    return NextResponse.json({ message: "User profile deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Failed to delete user profile:", error);
    return NextResponse.json({ message: "Failed to delete user profile" }, { status: 500 });
  }
}
