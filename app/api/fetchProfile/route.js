import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import Post from "@/models/post";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const username = searchParams.get("username");

    if (!username) {
      return NextResponse.json(
        { message: "Username is required" },
        { status: 400 }
      );
    }

    await connectMongoDB();
    const user = await User.findOne({ name: username });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Extract user info
    const {
      _id,
      name,
      bio,
      followerCount,
      followingCount,
      postCount,
      likedPosts,
      favoritedPosts,
      pfpUrl,
      following,
    } = user;

    // Get the post IDs from the user's document
    const postIds = user.posts;

    // Use the post IDs to find the corresponding posts
    const posts = await Post.find({ _id: { $in: postIds } });

    // Return user info along with their posts
    return NextResponse.json({
      user: {
        id: _id,
        username: name,
        bio,
        followerCount,
        followingCount,
        postCount,
        likedPosts,
        favoritedPosts,
        pfpUrl,
        following,
      },
      posts, // Return the found posts
    });
  } catch (error) {
    console.error("Error fetching user and posts fetchProfile:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
