import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectMongoDB();
    const { username } = await req.json();
    const user = await User.findOne({ name: username }).select("_id");
    return NextResponse.json({ user });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error,
    });
  }
}
