import { connectMongoDB } from "@/lib/mongodb";
import Post from "@/models/post";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function PATCH(req) {
  try {
    const { user_id, recipeId } = await req.json();

    await connectMongoDB();

    // Find the post and update likes atomically
    const updatedPost = await Post.findOneAndUpdate(
      { _id: recipeId },
      {
        $addToSet: { liked_user_ids: user_id },
        $inc: { recipe_likes: 1 }, // increment recipe likes // Add user if not already liked
      },
      { new: true } // Return the updated document
    );

    // Handle success or error based on the updatedPost
    if (!updatedPost) {
      return NextResponse.error(new Error("Post not found"), 404);
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: user_id },
      {
        $addToSet: { likedPosts: recipeId }, // Add user if not already liked
      },
      { new: true } // Return the updated document
    );

    // Handle success or error based on the updatedUser
    if (!updatedUser) {
      return NextResponse.error(new Error("User not found"), 404);
    }

    return NextResponse.json({
      message: "Post liked successfully",
      likeCount: updatedPost.recipe_likes,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.error(new Error("Failed to update likes"), 500);
  }
}

export async function DELETE(req) {
  try {
    const { user_id, recipeId } = await req.json();

    await connectMongoDB();

    // Find the post and update likes atomically (using $pull)
    const updatedPost = await Post.findOneAndUpdate(
      { _id: recipeId },
      {
        $pull: { liked_user_ids: user_id }, // Remove user if liked
        $inc: { recipe_likes: -1 }, // Decrement recipe likes
      },
      { new: true }
    );

    if (!updatedPost) {
      return NextResponse.error(new Error("Post not found"), 404);
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: user_id },
      {
        $pull: { likedPosts: recipeId }, // Add user if not already liked
      },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.error(new Error("User not found"), 404);
    }

    // You can optionally return a success message here
    return NextResponse.json({
      message: "Post unliked successfully",
      likeCount: updatedPost.recipe_likes,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.error(new Error("Failed to unlike post"), 500);
  }
}
