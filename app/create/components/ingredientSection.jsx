import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function IngredientSection({ formData, setFormData }) {
  const handleIngredientChange = (index, value) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index].name = value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      ingredients: newIngredients,
    }));
  };

  const addIngredient = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      ingredients: [...prevFormData.ingredients, { name: "" }],
    }));
  };

  const removeIngredient = (index) => {
    if (formData.ingredients.length === 1) {
      return;
    }
    const newIngredients = [...formData.ingredients];
    newIngredients.splice(index, 1);
    setFormData((prevFormData) => ({
      ...prevFormData,
      ingredients: newIngredients,
    }));
  };

  return (
    <>
      <ul>
        <AnimatePresence>
          {formData.ingredients.map((ingredient, index) => (
            <motion.li 
              key={index}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="flex flex-col mb-4"
            >
              <div className="flex items-center">
                <input
                  type="text"
                  value={ingredient.name}
                  onChange={(e) => handleIngredientChange(index, e.target.value)}
                  className="border border-gray-300 p-2 rounded-md focus:outline-none focus:border-custom-main-dark flex-grow"
                  required
                />
                <button
                  type="button"
                  onClick={() => removeIngredient(index)}
                  className={`ml-2 ${
                    formData.ingredients.length === 1
                      ? "bg-[#575A65] opacity-50 cursor-not-allowed"
                      : "bg-red-500"
                  } transition-colors ease-linear text-white px-4 py-2 rounded-md hover:bg-red-600`}
                  disabled={formData.ingredients.length === 1}
                >
                  Remove
                </button>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      <button
        type="button"
        onClick={addIngredient}
        className="bg-green-500 transition-colors ease-linear text-white px-4 py-2 rounded-md hover:bg-green-600"
      >
        Add Ingredient
      </button>
    </>
  );
}
