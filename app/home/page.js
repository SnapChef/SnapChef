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
        <div className="my-10 md:m-10 grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
          {/* <div className="grid gap-10 my-10 lg:ml-[405px] md:ml-0 sm:ml-0 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 xl:mr-16"> */}
          {posts.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      )}
      {!posts.length && <NotFoundPage />}
    </div>
  );
}
