// Import necessary modules and models
import { connectMongoDB } from "@/lib/mongodb";
//import User from "@/models/user";
//import Post from "@/models/post";
import Comment from "@/models/comment";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { 
        user_id, 
        recipe_id, 
        user_name, 
        text,
    } = await req.json();

    await connectMongoDB();

    // add new comment to database
    const newComment = await Comment.create({
        user_id, 
        recipe_id, 
        user_name, 
        text,
    });

    // add the below if comments require being in post and user schema
    // Update User document with the new comment ID
    // await User.findOneAndUpdate(
    //     { _id: user_id },
    //     { $push: { userComments: newComment._id } },
    //     { new: true }
    // );
    
    // // Update Post document with the new comment ID
    // await Post.findOneAndUpdate(
    //     { _id: recipe_id },
    //     { $push: { postComments: newComment._id } },
    //     { new: true }
    // );

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
