import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function PATCH(req) {
  try {
    const { user_id, recipeId } = await req.json();

    await connectMongoDB();

    const updatedUser = await User.findOneAndUpdate(
      { _id: user_id },
      {
        $addToSet: { favoritedPosts: recipeId }, // add recipe id to favorites
      },
      { new: true } // return the updated document
    );

    // handle success or error based on the updatedUser
    if (!updatedUser) {
      return NextResponse.error(new Error("User not found."), 404);
    }

    return NextResponse.json({
      message: "Post favorited successfully.",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.error(new Error("Failed to update favorites."), 500);
  }
}

export async function DELETE(req) {
  try {
    const { user_id, recipeId } = await req.json();

    await connectMongoDB();

    const updatedUser = await User.findOneAndUpdate(
      { _id: user_id },
      {
        $pull: { favoritedPosts: recipeId }, // delete recipe id from favorites
      },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.error(new Error("User not found."), 404);
    }

    return NextResponse.json({
      message: "Post unfavorited successfully.",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.error(new Error("Failed to unfavorite post."), 500);
  }
}
