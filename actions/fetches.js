"use server";

import { connectMongoDB } from "@/lib/mongodb";
import Post from "@/models/post";
import User from "@/models/user";
import Comment from "@/models/comment";

// SSR functions
export async function fetchHomeRecipes() {
  try {
    await connectMongoDB();
    const posts = await Post.find().limit(20).lean();
    const updatedPosts = await Promise.all(
      posts.map(async (post) => {
        const user = await User.findById(post.user_id).lean();
        if (user) {
          post.user_pfp = user.pfpUrl; // Add profile picture to post
          post.recipe_likes = post.liked_user_ids.length;
        }
        return post;
      })
    );
    return JSON.parse(JSON.stringify(updatedPosts));
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
    const user = await User.findOne({ name: username }).select("-password");

    if (!user) {
      return { error: "User not found" };
    }

    // Extract user info
    const { _id, name, bio, likedPosts, favoritedPosts, pfpUrl, following } =
      user;

    // Get the post IDs from the user's document
    const postIds = user.posts;

    // Use the post IDs to find the corresponding posts
    const posts = await Post.find({ _id: { $in: postIds } });

    // Update the recipe_likes to be liked_user_ids.length
    const postsWithLikes = posts.map((post) => {
      return {
        ...post.toObject(), // Convert mongoose document to plain JS object
        recipe_likes: post.liked_user_ids.length,
      };
    });

    // console.log("posts", posts[0]);

    // Return user info along with their posts
    return JSON.parse(
      JSON.stringify({
        user: {
          id: _id,
          username: name,
          bio,
          followerCount: user.followers.length,
          followingCount: user.following.length,
          postCount: postIds.length,
          likedPosts,
          favoritedPosts,
          pfpUrl,
          following,
        },
        posts: postsWithLikes, // Return the found posts
      })
    );
  } catch (error) {
    console.error("Error fetching user and posts fetchProfile:", error);
    return { error: "Internal server error" };
  }
}

export async function fetchRecipe(recipeId) {
  try {
    await connectMongoDB();
    const recipe = await Post.findById(recipeId);
    if (!recipe) {
      return { error: "Recipe not found!" };
    }

    // Get the user's profile picture URL
    const userId = recipe.user_id;
    const user = await User.findById(userId);
    const pfpUrl = user?.pfpUrl;

    const modifiedRecipe = {
      ...recipe._doc, // Spread the recipe data object
      user_pfp: pfpUrl, // Add the user's profile picture URL
    };

    return { recipe: JSON.parse(JSON.stringify(modifiedRecipe)) };
  } catch (error) {
    console.error("Error fetching recipe:", error.message);
    return { error: "Internal server error" };
  }
}

export async function fetchComments(recipeId) {
  try {
    await connectMongoDB();

    // find comments with matching recipe id
    const comments = await Comment.find({ recipe_id: recipeId });

    if (!comments || comments.length === 0)
      return { message: "No comments found for the provided recipe ID" };

    return { comments: JSON.parse(JSON.stringify(comments)) };
  } catch (error) {
    console.error("Error fetching comments:", error);
    return { message: "Internal server error" };
  }
}

export async function fetchFavRecipes(username) {
  try {
    if (!username) {
      return { message: "Username is required" };
    }

    await connectMongoDB();
    const user = await User.findOne({ name: username });

    if (!user) {
      return { message: "User not found" };
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
    return { documents: documents };
  } catch (error) {
    console.error("Error fetching user and posts fetch fav:", error);
    return { error: "Internal server error" };
  }
}

export async function fetchFilteredList(option) {
  try {
    await connectMongoDB();

    let query;
    if (
      option === "highProtein" ||
      option === "vegan" ||
      option === "glutenFree"
    ) {
      query = { recipe_attributes: option };
    } else {
      return { message: "Filter option not available!" };
    }

    const documents = await Post.find(query);
    documents.forEach((post) => {
      post.recipe_likes = post.liked_user_ids.length;
    });

    if (!documents || documents.length === 0)
      return { message: "No recipe(s) found!" };

    return { documents: documents };
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    return { error: "Internal server error" };
  }
}
