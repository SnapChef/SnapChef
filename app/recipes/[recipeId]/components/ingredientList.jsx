"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function IngredientList({ ingredients }) {
  const [checkedItems, setCheckedItems] = useState({});
  const [showIngredients, setShowIngredients] = useState(true);

  const handleCheckboxChange = (event) => {
    setCheckedItems({
      ...checkedItems,
      [event.target.id]: event.target.checked,
    });
  };

  return (
    <div className="">
      <button
        onClick={() => setShowIngredients(!showIngredients)}
        className="text-white bg-orange-400 hover:bg-orange-500 transition-colors ease-linear focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
        type="button"
      >
        Ingredients
        <svg 
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
      <AnimatePresence>
        {showIngredients && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4"
          >
            <ul>
              {ingredients.map((ingredient, index) => (
                <li key={index} className="mb-2">
                  <input
                    type="checkbox"
                    id={`ingredient${index}`}
                    className="rounded-full accent-orange-300 w-4 h-4 mr-2"
                    checked={checkedItems[`ingredient${index}`] || false}
                    onChange={handleCheckboxChange}
                  />
                  <label
                    htmlFor={`ingredient${index}`}
                    className={
                      checkedItems[`ingredient${index}`] ? "line-through text-opacity-5" : ""
                    }
                  >
                    {ingredient.name}
                  </label>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
