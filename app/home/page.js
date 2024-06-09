import Post from "@/components/post";
import SortFilterDropdown from "@/components/filterOptions";
import NotFoundPage from "@/app/not-found";
import { fetchHomeRecipes } from "@/actions/fetches";

export default async function Home() {
  const posts = await fetchHomeRecipes();

  if (!posts) {
    return <NotFoundPage />;
  }

  return (
    <div>
      <div className="flex justify-end">
        <SortFilterDropdown />
      </div>
      {posts.length > 0 && (
        <div className="md:m-10 grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
          {posts.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      )}
      {!posts.length && <NotFoundPage />}
    </div>
  );
}
