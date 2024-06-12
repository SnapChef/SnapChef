import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { fetchRecipe } from "@/actions/fetches.js";
import StepSection from "@/app/create/components/stepsSection";
import IngredientSection from "@/app/create/components/ingredientSection";

// removed temporarily
import AttributeSelector from "@/app/create/components/attributeSelector";

const EditRecipeModal = ({ recipeId, closeModal }) => {
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);
  const modalRef = useRef();

  useEffect(() => {
    const fetchRecipeData = async () => {
      const { recipe, error } = await fetchRecipe(recipeId);
      if (error) {
        console.error("Error fetching recipe:", error);
        setError(error);
      } else {
        setRecipe(recipe);
      }
    };
    fetchRecipeData();
  }, [recipeId]); 
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      [name]: value,
    }));
  };

  const handleStepChange = (updatedSteps) => {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      recipe_steps: updatedSteps,
    }));
  };

  const handleIngredientChange = (updatedIngredients) => {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      recipe_ingredients: updatedIngredients,
    }));
  };

  // bring back when fixed
  // const handleAttributeChange = (updatedAttributes) => {
  //   setRecipe((prevRecipe) => ({
  //     ...prevRecipe,
  //     recipe_attributes: updatedAttributes,
  //   }));
  // };

  const handleEdit = async (e) => {
    e.preventDefault();
  
    try {
      const updateRecipeResponse = await fetch(`/api/updateRecipe`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipeId: recipe._id,
          recipe_name: recipe.recipe_name,
          recipe_time: recipe.recipe_time,
          recipe_cals: recipe.recipe_cals,
          recipe_description: recipe.recipe_description,
          recipe_steps: recipe.recipe_steps,
          recipe_ingredients: recipe.recipe_ingredients,
          recipe_attributes: recipe.recipe_attributes,
        }),
      });
  
      if (!updateRecipeResponse.ok) {
        throw new Error("Failed to update recipe");
      }

      if (closeModal) {
        closeModal();
      }
    } catch (error) {
      console.error("Error updating recipe:", error);
    }
  };
  
  const handleCloseModal = () => {
    if (closeModal) {
      closeModal();
      document.body.classList.remove("modal-open");
    }
  };

  useEffect(() => {
    if (recipe) {
      document.body.classList.add("modal-open"); 
    }
  }, [recipe]);

  if (error) {
    return <div>{error}</div>;
  }
  if (!recipe) {
    return null; 
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-10 p-14">
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        ref={modalRef}
        className="border-solid border-2 border-custom-main-dark rounded-lg backdrop-blur-md max-h-full overflow-y-auto"
      >
        <div className="bg-custom-main-dark rounded-t-lg p-3">
          <h2 className="text-white text-xl font-bold">Edit Recipe</h2>
        </div>
        <div className="bg-white rounded-b-lg p-4">
          <form onSubmit={handleEdit} className="space-y-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1" htmlFor="recipe_name">
                Recipe Title:
              </label>
              <input
                type="text"
                name="recipe_name"
                id="recipe_name"
                required
                value={recipe.recipe_name}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 rounded-md focus:outline-none focus:border-custom-main-dark"
              />
            </div>
            <div className="flex space-x-4 justify-between">
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1" htmlFor="recipe_time">
                  Preparation Time (min):
                </label>
                <input
                  type="number"
                  name="recipe_time"
                  id="recipe_time"
                  required
                  value={recipe.recipe_time}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-2 rounded-md focus:outline-none focus:border-custom-main-dark"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1" htmlFor="recipe_cals">
                  Calories:
                </label>
                <input
                  type="number"
                  name="recipe_cals"
                  id="recipe_cals"
                  required
                  value={recipe.recipe_cals}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-2 rounded-md focus:outline-none focus:border-custom-main-dark"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1" htmlFor="recipe_description">
                Description:
              </label>
              <textarea
                name="recipe_description"
                id="recipe_description"
                required
                value={recipe.recipe_description}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 rounded-md focus:outline-none focus:border-custom-main-dark"
              />
            </div>

            {recipe.recipe_steps && (
              <StepSection
                steps={recipe.recipe_steps}
                setSteps={handleStepChange}
              />
            )}

            {recipe.recipe_ingredients && (
              <IngredientSection
                ingredients={recipe.recipe_ingredients}
                setIngredients={handleIngredientChange}
              />
            )}

            {/* removed editing attributes until solution is found */}
            {/* {recipe.recipe_attributes && (
              <AttributeSelector
                formData={recipe}
                setFormData={handleAttributeChange}
              />
            )} */}

            <div className="flex justify-end space-x-4 mt-4">
              <button
                type="button"
                onClick={handleCloseModal}
                className="bg-opacity-100 hover:bg-opacity-70 bg-red-500 transition-colors ease-linear text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-custom-main-dark bg-opacity-100 hover:bg-opacity-70 text-white transition-colors ease-linear px-4 py-2 rounded-md"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default EditRecipeModal;
