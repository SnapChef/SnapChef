import Post from "@/components/post";
import SortFilterDropdown from "@/components/filterOptions";
import NotFoundPage from "@/app/not-found";
import { connectMongoDB } from "@/lib/mongodb";
import PostModel from "@/models/post";
import User from "@/models/user";

export async function FetchRecipes() {
  try {
    await connectMongoDB();
    const posts = await PostModel.find().limit(8).lean();
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

export default async function Home() {
  const posts = await FetchRecipes();

  return (
    <div>
      <div className="flex justify-end">
        <SortFilterDropdown />
      </div>
      {posts.length > 0 && (
        <div className="md:m-10 grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
          {posts.map((post) => (
            <Post key={post._id} post={JSON.parse(JSON.stringify(post))} />
          ))}
        </div>
      )}
      {!posts.length && <NotFoundPage />}
    </div>
  );
}
