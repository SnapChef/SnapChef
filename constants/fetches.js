import { connectMongoDB } from "@/lib/mongodb";
import Post from "@/models/post";
import User from "@/models/user";

export async function fetchHomeRecipes() {
  try {
    await connectMongoDB();
    const posts = await Post.find().limit(20).lean();
    const updatedPosts = await Promise.all(
      posts.map(async (post) => {
        const user = await User.findById(post.user_id).lean();
        if (user) {
          post.user_pfp = user.pfpUrl; // Add profile picture to post
        }
        return post;
      })
    );
    return updatedPosts;
  } catch (error) {
    console.error("Error fetching homepage recipes:", error);
    return error;
  }
}

export async function fetchProfile(username) {
  try {
    if (!username) {
      return { message: "Username is required" };
    }

    await connectMongoDB();
    const user = await User.findOne({ name: username });

    if (!user) {
      return { message: "User not found" };
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
    return {
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
    };
  } catch (error) {
    console.error("Error fetching user and posts fetchProfile:", error);
    return;
    {
      message: "Internal server error";
    }
  }
}
