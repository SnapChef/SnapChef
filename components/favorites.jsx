"use client";
import { BsBookmark, BsBookmarkCheckFill } from "react-icons/bs";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import SignInModal from "../app/signin/components/signInModal";
import { motion } from "framer-motion";

export default function Favorites({ recipeId }) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const { data: session } = useSession();

  useEffect(() => {
    const fetchFavoritedPosts = async () => {
      if (session) {
        try {
          const userData = await fetch(`/api/fetchProfile`, {
            method: "POST",
            body: JSON.stringify({ username: session.user.name }),
          });
          const responseJson = await userData.json();
          setIsFavorited(responseJson.user.favoritedPosts.includes(recipeId));
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchFavoritedPosts();
  }, [session]);

  const handleFavClick = async () => {
    if (!session) {
      setShowMessage(true);
      return;
    }

    try {
      const method = !isFavorited ? "PATCH" : "DELETE";
      const response = await fetch("/api/updateFavorites", {
        method,
        body: JSON.stringify({
          user_id: session.user.id,
          recipeId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to update favorites");
      }
      setIsFavorited(!isFavorited);
      setShowOverlay(true);
      setTimeout(() => setShowOverlay(false), 3000); //display message for 3 seconds
    } catch (error) {
      console.error("Error updating favorites:", error);
    }
  };

  if (isFavorited === null) {
    return null;
  }

  return (
    <div className="flex-row items-center justify-center">
      {isFavorited ? (
        <BsBookmarkCheckFill
          className="text-custom-main-dark text-2xl hover:cursor-pointer"
          onClick={handleFavClick}
        />
      ) : (
        <BsBookmark
          className="text-custom-main-dark text-2xl hover:cursor-pointer"
          onClick={handleFavClick}
        />
      )}
      {showOverlay && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex items-center justify-center"
          onClick={() => setShowOverlay(false)}
        >
          <motion.div
            animate={{ scale: [0.5, 1.2, 1.0] }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="bg-custom-main-dark text-white font-sand font-semibold p-8 rounded-lg items-center"
          >
            <p className="text-lg text-center">
              {isFavorited
                ? "Recipe added to favorites!"
                : "Recipe removed from favorites!"}
            </p>
          </motion.div>
        </div>
      )}
      {showMessage && <SignInModal onClose={() => setShowMessage(false)} />}
    </div>
  );
}
