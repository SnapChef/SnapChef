"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import SignInModal from "../../../signin/components/signInModal";
import moment from "moment";

export default function CommentBox({ recipeId }) {
  const { data: session } = useSession();
  const [commentText, setCommentText] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form...");
    // prevent empty comment submissions
    if (!commentText.trim()) return;

    // check if user is logged in
    if (!session) {
      setShowModal(true);
      return;
    }

    try {
      const createCommentResponse = await fetch("/api/updateComments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: session.user?.id,
          recipe_id: recipeId,
          user_name: session.user?.name,
          text: commentText,
          time_sent: moment().format('M/D/YYYY [at] h:mmA'),
        }),
      });

      if (!createCommentResponse.ok) {
        throw new Error("Failed to create comment");
      }

      const responseData = await createCommentResponse.json();
      console.log(responseData);

      // clear comment box after submission
      setCommentText("");
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 shadow-md rounded-md my-6">
      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          name="text"
          id="text"
          value={commentText}
          onChange={handleInputChange}
          placeholder="Write your comment here..."
          rows={3}
          className="p-2 rounded-md w-full focus:outline-none focus:border-custom-main-dark border"
          required
        />
        <button
          type="submit"
          className="bg-custom-main-dark px-4 py-2 rounded-lg text-white hover:bg-opacity-70 transition-all ease-linear mt-2"
        >
          Add Comment
        </button>
      </form>
      {showModal && <SignInModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
