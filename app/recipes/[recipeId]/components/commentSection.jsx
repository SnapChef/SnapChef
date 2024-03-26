"use client";
import { useEffect, useState } from 'react';
import Comment from "./comment";

export default function CommentSection({ commentData }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (commentData && commentData.comments) {
      setComments(commentData.comments);
    } else {
      console.error('No comments found for the provided recipe ID');
    }
  }, [commentData]);

  return (
    <div className="max-w-4xl mx-auto p-6 shadow-md rounded-md my-6 border-4 border-[#575A65]">
      <div className="max-h-80 overflow-y-auto" style={{ maxHeight: "400px" }}>
        {comments.length === 0 ? (
          <>
            <h2 className="text-2xl font-semibold mb-4">Comments</h2>
            <p className="text-gray-500">No comments yet.</p>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-semibold mb-4">Comments ({comments.length})</h2>
            {comments.map((comment, index) => (
              <Comment key={index} comment={comment} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
