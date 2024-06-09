import React from "react";
import Post from "@/components/post";
import { fetchSearchTerm } from "@/actions";
import SortFilterDropdown from "@/components/filterOptions";

export default async function Search({ params }) {
  try {
    const { term } = params;
    const data = await fetchSearchTerm(term);

    // check if there's recipes in json based on search term
    if (!data || !data.documents) {
      return (
        <div>
          <div className="flex justify-end">
            <SortFilterDropdown />
          </div>
          <p className="text-3xl text-gray-500 font-light flex flex-col items-center justify-center h-screen text-fadeIn">
            No results found for &quot;{decodeURIComponent(term)}&quot;. Try
            another recipe!
          </p>
        </div>
      );
    }

    return (
      <div>
        <div className="flex justify-between">
          <p className="font-light text-xl px-12 mt-3">
            {data.documents.length} results for &quot;
            <strong>{decodeURIComponent(term)}</strong>&quot;
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
    console.error("Error fetching recipe by search term:", error);
  }
}
