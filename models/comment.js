import mongoose, { Schema, models } from "mongoose";

export const commentSchema = new Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    recipe_id: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    user_name: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    time_sent: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Comment = models.Comment || mongoose.model("Comment", commentSchema);
export default Comment;
