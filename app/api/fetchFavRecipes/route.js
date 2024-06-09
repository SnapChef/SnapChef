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

    // get favorited posts IDs from the user's document
    const postIds = user.favoritedPosts;

    // use post IDs to find the corresponding posts
    const query = { _id: { $in: postIds } };
    const documents = await Post.find(query);

    documents.forEach((post) => {
      post.recipe_likes = post.liked_user_ids.length;
    });

    // return favorited posts information
    return NextResponse.json({ documents: documents });
  } catch (error) {
    console.error("Error fetching user and posts fetch fav:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
