import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const IngredientSection = ({ ingredients, setIngredients, formData, setFormData }) => {
  const currentIngredients = ingredients || formData.ingredients;
  const updateIngredients = setIngredients || ((newIngredients) => setFormData((prevFormData) => ({ ...prevFormData, ingredients: newIngredients })));

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...currentIngredients];
    newIngredients[index].name = value;
    updateIngredients(newIngredients);
  };

  const addIngredient = () => {
    updateIngredients([...currentIngredients, { name: "" }]);
  };

  const removeIngredient = (index) => {
    if (currentIngredients.length === 1) {
      return; // Do not remove if it's the only ingredient
    }
    const newIngredients = [...currentIngredients];
    newIngredients.splice(index, 1);
    updateIngredients(newIngredients);
  };

  return (
    <>
      <ul>
        <AnimatePresence>
          {currentIngredients.map((ingredient, index) => (
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
                    currentIngredients.length === 1
                      ? "bg-[#575A65] opacity-50 cursor-not-allowed"
                      : "bg-red-500"
                  } transition-colors ease-linear text-white px-3 py-2 rounded-md hover:bg-red-600`}
                  disabled={currentIngredients.length === 1}
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
};

export default IngredientSection;
