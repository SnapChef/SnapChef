import { connectMongoDB } from "@/lib/mongodb";
import RecipePost from "@/models/post";
import { NextResponse } from "next/server";

export async function DELETE(req) {
    try {
      await connectMongoDB();
      const { recipeId } = await req.json();
  
      const deletedRecipe = await RecipePost.findByIdAndDelete(recipeId);
  
      if (!deletedRecipe) {
        return NextResponse.error(new Error("Recipe not found."), 404);
      }
  
      return NextResponse.json({
        message: "Recipe deleted successfully.",
        deletedRecipe,
      });
    } catch (error) {
      console.error("Error deleting recipe:", error);
      return NextResponse.error(new Error("Failed to delete recipe."), 500);
    }
  }