"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import SnapChefLogo from "../assets/LogoDesign1.svg";
import Search from "../assets/icons/search.svg";
import Autosuggest from "react-autosuggest";
import Fuse from "fuse.js";
import { fetchRecipeNames } from "@/actions/fetches";
import NavbarIcons from "./navbarIcons";

const fuseSettings = {
  keys: ["recipe_name"], // key to search
  threshold: 0.4, // set the threshold for fuzzy search
};

function Navbar() {
  const pathname = usePathname();
  const [activePath, setActivePath] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    // Update active path whenever the route changes
    setActivePath(pathname);
  }, [pathname]);

  // sets URL to fetch recipes based on search term
  const handleSubmit = (e) => {
    const trimmedTerm = searchTerm.trim(); // trim the search term and see if empty
    if (!trimmedTerm) {
      e.preventDefault(); //do nothing if search bar is empty
      return;
    }
    e.preventDefault();
    window.location.href = `/search/${searchTerm}`;
    setSearchTerm("");
  };

  // // autocomplete feature
  // useEffect(() => {
  //   if (searchTerm.length > 1) {
  //     fetchRecipeNames(searchTerm)
  //       .then((data) => setSuggestions(data?.recipeNames || []))
  //       .catch((error) => console.error("Error fetching recipe names:", error));
  //   } else {
  //     setSuggestions([]);
  //   }
  // }, [searchTerm]);

  useEffect(() => {
    const recipeNames = async () => {
      if (searchTerm.length > 1) {
        try {
          const recipeData = await fetchRecipeNames();
          setSuggestions(recipeData?.recipeNames || []);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setSuggestions([]);
      }
    };

    recipeNames();
  }, [searchTerm]);

  // fuzzy search integration
  const performSearch = (value) => {
    if (!value || value.trim() === "") {
      setSearchResults([]);
      return;
    }
    const fuse = new Fuse(suggestions, fuseSettings);
    const result = fuse.search(value);
    setSearchResults(result.map((res) => res.item));
  };

  const handleInputChange = (_, { newValue }) => {
    setSearchTerm(newValue);
    performSearch(newValue);
  };

  const autosuggestProps = {
    suggestions: searchResults.slice(0, 5), // displays top 5 suggestions
    onSuggestionsFetchRequested: ({ value }) => {
      performSearch(value);
    },
    onSuggestionsClearRequested: () => {
      setSearchResults([]);
    },
    getSuggestionValue: (suggestion) => suggestion || "", // handle arrow key usage
    renderSuggestion: (
      suggestion,
      { isHighlighted } //drop down
    ) => (
      <div
        style={{
          border: "1px solid #ccc",
          borderBottom: "1px solid #ccc",
          padding: "8px",
          backgroundColor: isHighlighted ? "#eee" : "white",
        }}
      >
        {suggestion}
      </div>
    ),
    onSuggestionSelected: (_, { suggestion }) => {
      //search recipes on enter key (when using dropdown)
      window.location.href = `/search/${suggestion}`;
      setSearchTerm("");
    },
  };

  return (
    <nav className="flex items-center justify-between p-4 relative mr-10">
      {/* Use the larger SnapChef.svg logo */}
      <Link href="/">
        <Image
          src={SnapChefLogo}
          alt="SnapChefLogo"
          className="cursor-pointer"
          width={300}
          height={300}
          style={{ position: "relative", top: "0px" }} // Adjust the top value
        />
      </Link>
      {/* Display only the search field on the home and search page */}
      {(pathname === "/home" ||
        pathname.startsWith("/search/") ||
        pathname.startsWith("/filter/")) && (
        <form onSubmit={handleSubmit} className="z-10">
          <div className="fixed top-8 transform -translate-x-1/2">
            <div className="relative">
              <div className="absolute top-0 left-0 flex items-center m-2">
                <Image src={Search} alt="Search" width={20} height={20} />
              </div>
              <Autosuggest
                {...autosuggestProps}
                inputProps={{
                  type: "search",
                  placeholder: "Search...",
                  className:
                    "w-full px-2 py-1 border-2 border-gray-300 rounded pl-8 xl:w-96",
                  onChange: handleInputChange,
                  value: searchTerm,
                }}
              />
            </div>
          </div>
        </form>
      )}
      <NavbarIcons />
    </nav>
  );
}

export default Navbar;
