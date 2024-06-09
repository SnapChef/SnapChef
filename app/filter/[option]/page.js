import Post from "@/components/post";
import { fetchFilteredList } from "@/constants/fetches";
import SortFilterDropdown from "@/components/filterOptions";
import NotFoundPage from "@/app/not-found";

export default async function SearchByFilter({ params }) {
  try {
    const { option } = params;
    const data = await fetchFilteredList(option);

    if (
      option !== "highProtein" &&
      option !== "vegan" &&
      option !== "glutenFree"
    ) {
      return <NotFoundPage />;
    }

    if (data.message || data.error) {
      return <NotFoundPage />;
    }

    let filterOptionText;
    if (option === "highProtein") {
      filterOptionText = <strong>High Protein</strong>;
    } else if (option === "vegan") {
      filterOptionText = <strong>Vegan</strong>;
    } else if (option === "glutenFree") {
      filterOptionText = <strong>Gluten Free</strong>;
    }

    // check if there's recipes in json based on filter option selected
    if (!data || !data.documents) {
      return (
        <div>
          <div className="flex justify-end">
            <SortFilterDropdown />
          </div>
          <p className="text-3xl text-gray-500 font-light flex flex-col items-center justify-center h-screen text-fadeIn">
            No results found under &quot;{filterOptionText}&quot;. Try another
            filter option!
          </p>
        </div>
      );
    }

    return (
      <div>
        <div className="flex justify-between">
          <p className="font-light text-xl px-12 mt-3">
            {data.documents.length} results sorted by: {filterOptionText}
          </p>
          <SortFilterDropdown />
        </div>
        <div className="m-10 grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
          {data.documents.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching recipe by filter option:", error);
  }
}
