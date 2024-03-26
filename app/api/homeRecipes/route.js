import { connectMongoDB } from "@/lib/mongodb";
import Post from "@/models/post";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();
    const posts = await Post.find().lean(); // Fetch all posts
    const updatedPosts = await Promise.all(
      posts.map(async (post) => {
        const user = await User.findById(post.user_id).lean(); // Fetch user by user ID
        if (user) {
          post.user_pfp = user.pfpUrl; // Add profile picture to post
        }
        return post;
      })
    );
    return NextResponse.json({ documents: updatedPosts }); // Return updated posts in a NextResponse object
  } catch (error) {
    console.error("Error fetching homepage recipes:", error);
    return NextResponse.error(`Internal Server Error: ${error.message}`);
  }
}
