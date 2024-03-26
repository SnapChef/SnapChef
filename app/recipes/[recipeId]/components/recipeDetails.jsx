"use client";
import React, { useState } from "react";
import Image from "next/image";
import image from "@/assets/zeytandzaa.png"
import { FaUserCircle } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci";
import { IoIosTimer } from "react-icons/io";
import { FaFireFlameCurved } from "react-icons/fa6";
import { LuVegan } from "react-icons/lu";

function RecipeDetails() {
  const [checkedItems, setCheckedItems] = useState({});
  const [showIngredients, setShowIngredients] = useState(false);
  const [showSteps, setShowSteps] = useState(false);

  const handleCheckboxChange = (event) => {
    setCheckedItems({
      ...checkedItems,
      [event.target.id]: event.target.checked,
    });
  };

  return (
    <div className="mt-10 mx-auto max-w-[300px]">
      <div>
        <FaUserCircle className="pb-2 text-orange-500" size={25} />
      </div>
      <div className="flex justify-center">
        <Image src={image} alt="zeyt" width={400} height={400} />
      </div>
      <div className="flex items-center pt-2 ">
        <p className="font-bold">Zeyt and Zaatar</p>
        <div className="pl-32">
          <FaRegHeart style={{ color: "#FF8C00" }} size={20} />
        </div>
        <div className="pl-2">
          <CiBookmark style={{ color: "#FF8C00" }} size={20} />
        </div>
      </div>
      <div className="flex items-center mt-2">
        <div className="flex flex-col items-center mr-4">
          <IoIosTimer />
          <p className="font-sans text-xs text-gray-500"> mins </p>
        </div>
        <div className="flex flex-col items-center">
          <FaFireFlameCurved style={{ color: "#FFA500" }} />
          <p className="font-sans text-xs text-gray-500">cals</p>
        </div>
        <div className=" flex flex-col items-center pl-5 pb-4">
          <LuVegan style={{ color: "green" }} size={18} />
        </div>
      </div>
      <div className="mt-4">
        <button
          id="dropdownDefaultButton"
          onClick={() => setShowIngredients(!showIngredients)}
          className="text-white bg-orange-400 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-4 py-2 text-center inline-flex items-center dark:bg-orange-500 dark:hover:bg-orange-600 dark:focus:ring-orange-700"
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
        <button
          onClick={() => setShowSteps(!showSteps)} // Add this line to toggle the visibility of the steps
          className="text-white bg-orange-400 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-orange-500 dark:hover:bg-orange-600 dark:focus:ring-orange-700 ml-2" // Add ml-2 for left margin
          type="button"
        >
          Steps
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
        
        {showIngredients && (
          <div>
            <h2 className="text-lg font-semibold mt-4">Ingredients</h2>
            <ul className="list-none m-0 p-0">
              <li className="flex items-center">
                <input
                  type="checkbox"
                  id="ingredient1"
                  className="rounded-full accent-orange-300 w-4 h-4 mr-2"
                  checked={checkedItems.ingredient1 || false}
                  onChange={handleCheckboxChange}
                />
                <label
                  htmlFor="ingredient1"
                  className={checkedItems.ingredient1 ? "line-through" : ""}
                >
                  1 cup Olive Oil
                </label>
              </li>
              <li className="flex items-center">
                <input
                  type="checkbox"
                  id="ingredient2"
                  className="rounded-full accent-orange-300 w-4 h-4 mr-2"
                  checked={checkedItems.ingredient2 || false}
                  onChange={handleCheckboxChange}
                />
                <label
                  htmlFor="ingredient2"
                  className={checkedItems.ingredient2 ? "line-through" : ""}
                >
                  1 cup Zaatar
                </label>
              </li>
              <li className="flex items-center">
                <input
                  type="checkbox"
                  id="ingredient3"
                  className="rounded-full accent-orange-300 w-4 h-4 mr-2"
                  checked={checkedItems.ingredient3 || false}
                  onChange={handleCheckboxChange}
                />
                <label
                  htmlFor="ingredient3"
                  className={checkedItems.ingredient3 ? "line-through" : ""}
                >
                  Pita bread
                </label>
              </li>
            </ul>
          </div>
        )}
        </div>
      {showSteps && (
      <div className="mt-5">
        <h3 className="text-lg font-semibold">Steps</h3>
        <p>Step 1 : Pour 1 cup of your favourite zaatar into a bowl</p>
        <p>Step 2: Pour 1 cup of olive oil into a bowl</p>
        <p>Step 3: Heat up pita bread </p>
      </div>
      )}
    </div>
  );
};

export default RecipeDetails;
