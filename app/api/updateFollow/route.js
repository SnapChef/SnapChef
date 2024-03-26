import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function PATCH(req) {
  try {
    const { user_id, target_user_id } = await req.json();

    await connectMongoDB();

    // Find and update both users atomically, including follower/following counts
    const updatedUser = await User.findOneAndUpdate(
      { _id: user_id },
      {
        $addToSet: { following: target_user_id },
        $inc: { followingCount: 1 }, // Increment followingCount
      },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.error(new Error("User not found"), 404);
    }

    const updatedTargetUser = await User.findOneAndUpdate(
      { _id: target_user_id },
      {
        $addToSet: { followers: user_id },
        $inc: { followerCount: 1 }, // Increment followerCount
      },
      { new: true }
    );

    if (!updatedTargetUser) {
      return NextResponse.error(new Error("Target user not found"), 404);
    }

    return NextResponse.json({
      message: "User followed successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.error(new Error("Failed to follow user"), 500);
  }
}

export async function DELETE(req) {
  try {
    const { user_id, target_user_id } = await req.json();

    await connectMongoDB();

    // Find and update both users atomically, including follower/following counts
    const updatedUser = await User.findOneAndUpdate(
      { _id: user_id },
      {
        $pull: { following: target_user_id },
        $inc: { followingCount: -1 }, // Decrement followingCount
      },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.error(new Error("User not found"), 404);
    }

    const updatedTargetUser = await User.findOneAndUpdate(
      { _id: target_user_id },
      {
        $pull: { followers: user_id },
        $inc: { followerCount: -1 }, // Decrement followerCount
      },
      { new: true }
    );

    if (!updatedTargetUser) {
      return NextResponse.error(new Error("Target user not found"), 404);
    }

    return NextResponse.json({
      message: "User unfollowed successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.error(new Error("Failed to unfollow user"), 500);
  }
}
