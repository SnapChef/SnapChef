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
          post.user_pfp = user.pfpUrl;
          post.recipe_likes = post.liked_user_ids.length; // Add profile picture to post
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
    const user = await User.findOne({ name: username });

    if (!user) {
      return { error: "User not found" };
    }

    // Extract user info
    let {
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

    // Update the recipe_likes to be liked_user_ids.length
    posts.forEach((post) => {
      post.recipe_likes = post.liked_user_ids.length;
    });

    // Update the followerCount to be followers.length
    followerCount = user.followers.length;
    followingCount = user.following.length;

    // Return user info along with their posts
    return JSON.parse(
      JSON.stringify({
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
    return { documents: documents };
  } catch (error) {
    console.error("Error fetching user and posts fetch fav:", error);
    return { error: "Internal server error" };
  }
}
