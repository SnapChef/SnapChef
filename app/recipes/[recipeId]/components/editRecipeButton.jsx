"use client";

import { FaEdit } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import EditRecipeModal from "./editRecipeModal";

export default function EditRecipeButton({ username, recipeId }) {
  const { data: session } = useSession();
  const [showEditModal, setShowEditModal] = useState(false);
  const [isCurrentUsersRecipe, setIsCurrentUsersRecipe] = useState(false);

  useEffect(() => {
    if (session && session.user.name === username) {
      setIsCurrentUsersRecipe(true);
    }
  }, [session, username]);

  const handleModalClick = () => {
    setShowEditModal(!showEditModal);
  };

  return (
    <div>
      {isCurrentUsersRecipe && (
        <FaEdit
          className="cursor-pointer"
          onClick={handleModalClick}
          color={showEditModal ? "#A3A3A3" : "#FF9103"}
          size={30}
        />
      )}
      {showEditModal && (
        <EditRecipeModal
          recipeId={recipeId}
          closeModal={() => setShowEditModal(false)}
        />
      )}
    </div>
  );
}