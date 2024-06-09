import IngredientList from "@/app/recipes/[recipeId]/components/ingredientList";
import AttributeList from "@/app/recipes/[recipeId]/components/attributeList";
import StepList from "@/app/recipes/[recipeId]/components/stepList";
import NotFoundPage from "@/app/not-found";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import { fetchRecipe } from "@/constants/fetches.js";
import Likes from "@/components/likes";
import Favorites from "@/components/favorites";
import Image from "next/image";
import CommentBox from "@/app/recipes/[recipeId]/components/commentBox";
import CommentSection from "@/app/recipes/[recipeId]/components/commentSection";

export default async function RecipePage({ params }) {
  const { recipeId } = params;
  const recipe = await fetchRecipe(recipeId);
  const likeCount = recipe.recipe.liked_user_ids.length;

  if (!recipe) {
    return <NotFoundPage />;
  }

  return (
    <div className="max-w-3xl mx-auto my-16">
      <Link
        href={`/profile/${recipe.recipe.user_name}`}
        className="flex items-center mb-1 hover:underline hover:cursor-pointer hover:opacity-70"
      >
        {recipe.recipe.user_pfp ? (
          <Image
            src={recipe.recipe.user_pfp}
            className="rounded-full mr-2"
            height={50}
            width={50}
            style={{
              width: "50px",
              height: "50px",
              objectFit: "cover",
            }}
            alt={recipe.recipe.user_name}
          />
        ) : (
          <FaUserCircle className="mr-2 text-xl text-custom-main-dark" />
        )}
        <p className="text-2xl">{recipe.recipe.user_name}</p>
      </Link>
      <img
        src={recipe.recipe.recipe_image}
        alt={recipe.recipe_name}
        className="mb-3"
      />
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold mb-4">{recipe.recipe.recipe_name}</h1>
        <div className="flex justify-between space-x-4">
          <Likes likeCount={likeCount} recipeId={recipe.recipe._id} />
          <Favorites recipeId={recipe.recipe._id} />
        </div>
      </div>

      <AttributeList
        attributes={recipe.recipe.recipe_attributes}
        time={recipe.recipe.recipe_time}
        cals={recipe.recipe.recipe_cals}
      />
      <div className="flex justify-between">
        <div>
          <p className="my-4">{recipe.recipe.recipe_description}</p>
          <StepList steps={recipe.recipe.recipe_steps} />
        </div>
        <IngredientList ingredients={recipe.recipe.recipe_ingredients} />
      </div>
      <CommentSection recipeId={recipe.recipe._id} />
      <CommentBox recipeId={recipe.recipe._id} />
    </div>
  );
}
