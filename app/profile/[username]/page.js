import NotFoundPage from "@/app/not-found";
import Profile from "./components/profile";
import ProfilePosts from "./components/profilePosts";
import Link from "next/link";
import { fetchProfile } from "@/actions/fetches";

export default async function ProfilePage({ params }) {
  const { username } = params;
  const profile = await fetchProfile(username);

  if (!profile || profile == null || profile == undefined || profile.error) {
    return <NotFoundPage />;
  }

  return (
    <div className="lg:flex lg:flex-col justify-center lg:justify-start">
      <Profile profile={profile} />
      {profile?.user?.postCount > 0 ? (
        <div className="grid gap-10 my-10 lg:ml-[405px] md:ml-0 sm:ml-0 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 xl:mr-16">
          {profile.posts.map((post) => (
            <Link
              key={post._id}
              href={`/recipes/${post._id}`}
              className="hover:opacity-90 transition-opacity ease-linear"
            >
              <ProfilePosts
                posts={{
                  title: post.recipe_name,
                  likeCount: post.recipe_likes,
                  imageURL: post.recipe_image,
                }}
              />
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex justify-center text-gray-500 mt-44">
          No posts yet.
        </div>
      )}
    </div>
  );
}
