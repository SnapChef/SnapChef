import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function PATCH(req) {
  try {
    const { user_id, target_user_id } = await req.json();

    if (!user_id || !target_user_id) {
      return NextResponse.error(
        new Error("Missing user_id or target_user_id"),
        400
      );
    }

    if (user_id === target_user_id) {
      return NextResponse.error(new Error("Cannot follow yourself"), 400);
    }

    await connectMongoDB();

    // Find and update both users atomically, including follower/following counts
    const updatedUser = await User.findOneAndUpdate(
      { _id: user_id },
      {
        $addToSet: { following: target_user_id },
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

    if (!user_id || !target_user_id) {
      return NextResponse.error(
        new Error("Missing user_id or target_user_id"),
        400
      );
    }

    if (user_id === target_user_id) {
      return NextResponse.error(new Error("Cannot follow yourself"), 400);
    }

    await connectMongoDB();

    // Find and update both users atomically, including follower/following counts
    const updatedUser = await User.findOneAndUpdate(
      { _id: user_id },
      {
        $pull: { following: target_user_id },
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
