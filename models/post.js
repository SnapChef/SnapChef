import mongoose, { Schema, models, mongo } from "mongoose";

//this assigns the variable name with its variable type in MongoDB
export const postSchema = new Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    user_name: {
      type: String,
      required: true,
    },
    recipe_name: {
      type: String,
      required: true,
    },
    recipe_image: {
      type: String,
      required: true,
    },
    recipe_time: {
      type: Number,
      required: true,
    },
    recipe_cals: {
      type: Number,
      required: true,
    },
    recipe_description: {
      type: String,
      required: true,
    },
    liked_user_ids: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    recipe_steps: [
      {
        header: {
          type: String,
          default: "",
        },
        description: {
          type: String,
          default: "",
        },
      },
    ],
    recipe_ingredients: [
      {
        name: {
          type: String,
          default: "",
        },
      },
    ],
    recipe_attributes: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

const Post = models.Post || mongoose.model("Post", postSchema);
export default Post;
