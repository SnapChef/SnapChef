import { connectMongoDB } from "@/lib/mongodb";
import Comment from "@/models/comment";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { 
        user_id, 
        recipe_id, 
        user_name, 
        text,
        time_sent,

    } = await req.json();

    await connectMongoDB();

    // add new comment to database
    const newComment = await Comment.create({
        user_id, 
        recipe_id, 
        user_name, 
        text,
        time_sent,
    });

    //debugging purposess
    console.log(newComment);

    if (!newComment) {
      return NextResponse.error(new Error("Failed to create comment"), 500);
    }

    return NextResponse.json({
      message: "Comment created successfully",
      status: 201,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.error(new Error("Failed to create comment"), 500);
  }
}
