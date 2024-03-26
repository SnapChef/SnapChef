"use client";
import { useState, useEffect } from "react";
import Post from "@/components/post";
import SortFilterDropdown from "@/components/filterOptions";
import NotFoundPage from "@/app/not-found";

export default function Home() {
  const [posts, setPosts] = useState([]); // Use state to store fetched recipes
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Store any errors during fetching

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/homeRecipes"); // Adjust API endpoint
        if (!response.ok) {
          throw new Error(`Failed to fetch recipes: ${response.statusText}`);
        }
        const data = await response.json();
        setPosts(data.documents); // Update state with fetched recipes
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData(); // Fetch data on component mount
  }, []); // Empty dependency array ensures fetching only happens once

  return (
    <div>
      <div className="flex justify-end">
        <SortFilterDropdown />
      </div>
      {isLoading && <p>Loading recipes...</p>}
      {error && <p>Error: {error}</p>}
      {posts.length > 0 && (
        <div className="m-10 grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
          {posts.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      )}
      {!posts.length && !isLoading && !error && <NotFoundPage />}
    </div>
  );
}
