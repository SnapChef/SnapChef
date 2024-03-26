import Post from "@/components/post";
import { fetchFavRecipes } from "@/constants";

export default async function Favorites({ params }) {
  const { username } = params;
  const data = await fetchFavRecipes(username);

  return (
    <div className="h-screen">
      <h1 className="flex flex-col items-center justify-center text-4xl text-custom-main-dark font-sand font-semibold">
        Saved Recipes
      </h1>
      {data.documents.length === 0 ? (
        <p className="text-2xl text-gray-500 font-light flex flex-col items-center justify-center mt-36 text-fadeIn">
          No recipes saved.
        </p>
      ) : (
        <div className="m-10 grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
          {data.documents.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
