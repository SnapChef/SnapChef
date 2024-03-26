import { connectMongoDB } from "@/lib/mongodb";
import Post from "@/models/post";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");

  try {
    await connectMongoDB();
    const recipe = await Post.findById(id);
    if (!recipe) {
      return NextResponse.json(
        { message: "Recipe not found" },
        { status: 404 }
      );
    }

    const userId = recipe.user_id;
    const user = await User.findById(userId);
    const pfpUrl = user?.pfpUrl;

    // Destructure recipe data and combine with pfpUrl
    const {
      _id,
      user_name,
      recipe_name,
      recipe_image,
      recipe_time,
      recipe_cals,
      recipe_description,
      recipe_likes,
      recipe_steps,
      recipe_ingredients,
      recipe_attributes,
      saved_user_ids,
    } = recipe._doc; // Access the actual data object

    const modifiedRecipe = {
      _id,
      user_name,
      recipe_name,
      recipe_image,
      recipe_time,
      recipe_cals,
      recipe_description,
      recipe_likes,
      recipe_steps,
      recipe_ingredients,
      recipe_attributes,
      saved_user_ids,
      user_pfp: pfpUrl,
    };

    return NextResponse.json({ recipe: modifiedRecipe }, { status: 200 });
  } catch (error) {
    console.error("Error fetching recipe:", error.message);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
