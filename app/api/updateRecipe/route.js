import { connectMongoDB } from "@/lib/mongodb";
import RecipePost from "@/models/post";
import { NextResponse } from "next/server";

export async function PATCH(req) {
  try {
    await connectMongoDB();
    const {
      recipeId,
      recipe_name,
      recipe_time,
      recipe_cals,
      recipe_description,
      recipe_steps,
      recipe_ingredients,
      recipe_attributes,
    } = await req.json();

    const updateFields = {};

    if (recipe_name !== undefined) {
      updateFields.recipe_name = recipe_name;
    }
    if (recipe_time !== undefined) {
      updateFields.recipe_time = recipe_time;
    }
    if (recipe_cals !== undefined) {
      updateFields.recipe_cals = recipe_cals;
    }
    if (recipe_description !== undefined) {
      updateFields.recipe_description = recipe_description;
    }
    if (recipe_steps !== undefined) {
      updateFields.recipe_steps = recipe_steps;
    }
    if (recipe_ingredients !== undefined) {
      updateFields.recipe_ingredients = recipe_ingredients;
    }
    if (recipe_attributes !== undefined) {
      updateFields.recipe_attributes = recipe_attributes;
    }

    const updatedRecipe = await RecipePost.findByIdAndUpdate(
      recipeId,
      updateFields,
      { new: true }
    );

    if (!updatedRecipe) {
      return NextResponse.error(new Error("Recipe not found."), 404);
    }

    return NextResponse.json({
      message: "Recipe updated successfully.",
      updatedRecipe,
    });
  } catch (error) {
    console.error("Error updating recipe:", error);
    return NextResponse.error(new Error("Failed to update recipe."), 500);
  }
}