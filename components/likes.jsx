"use client";

import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import SignInModal from "../app/signin/components/signInModal";
import { motion } from "framer-motion";

export default function Likes({ likeCount, recipeId }) {
  const [isLiked, setIsLiked] = useState(false);
  const [updatedLikeCount, setUpdatedLikeCount] = useState(likeCount);
  const [showModal, setShowModal] = useState(false);

  const { data: session } = useSession();

  useEffect(() => {
    // See if the user has liked the post
    const fetchLikedPosts = async () => {
      if (session) {
        try {
          const userData = await fetch(`/api/fetchProfile`, {
            method: "POST",
            body: JSON.stringify({ username: session.user.name }),
          });
          const responseJson = await userData.json();
          setIsLiked(responseJson.user.likedPosts.includes(recipeId));
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchLikedPosts();
  }, [session, recipeId]);

  const handleLikeClick = async () => {
    if (!session) {
      setShowModal(true);
      return;
    }

    try {
      const method = !isLiked ? "PATCH" : "DELETE";
      const response = await fetch("/api/updateLikeCount", {
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
        throw new Error("Failed to update like count");
      }

      const responseData = await response.json();
      setUpdatedLikeCount(responseData.likeCount);
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("Error updating like count:", error);
    }
  };

  if (isLiked === null) return null;

  return (
    <div className="flex-row items-center justify-center">
      {isLiked ? (
        <FaHeart
          className="text-custom-main-dark text-2xl hover:cursor-pointer hover:fill-custom-main-dark"
          onClick={handleLikeClick}
        />
      ) : (
        <motion.div whileTap={{ scale: 1.5 }}>
          <FaRegHeart
            className="text-custom-main-dark text-2xl hover:cursor-pointer"
            onClick={handleLikeClick}
          />
        </motion.div>
      )}
      <p className="text-lg text-center">{updatedLikeCount}</p>

      {showModal && <SignInModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
