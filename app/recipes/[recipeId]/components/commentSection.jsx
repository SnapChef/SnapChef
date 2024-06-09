import Comment from "./comment";
import { fetchComments } from "@/actions/fetches.js";

export default async function CommentSection({ recipeId }) {
  let comments = [];

  try {
    const response = await fetchComments(recipeId);
    if (response.comments) {
      comments = response.comments;
    } else {
      console.error(response.message);
    }
  } catch (error) {
    console.error("Error fetching comments:", error.message);
  }

  return (
    <div className="max-w-4xl mx-auto p-6 shadow-md rounded-md my-6">
      <div className="max-h-80 overflow-y-auto" style={{ maxHeight: "400px" }}>
        <h2 className="text-2xl font-semibold mb-4">
          Comments {comments.length > 0 && `(${comments.length})`}
        </h2>
        {comments.length === 0 ? (
          <p className="text-gray-500">No comments yet.</p>
        ) : (
          comments.map((comment, index) => (
            <Comment key={index} comment={comment} />
          ))
        )}
      </div>
    </div>
  );
}
