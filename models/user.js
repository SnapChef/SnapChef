import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    pfpUrl: {
      type: String,
    },
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    postCount: {
      type: Number,
      default: 0,
    },
    likedPosts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    favoritedPosts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    bio: {
      type: String,
      default: "Add Bio.",
    },
    followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema);
export default User;
