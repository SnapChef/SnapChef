"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Post from "@/components/post";
import StepSection from "./stepsSection";
import IngredientSection from "./ingredientSection";
import AttributeSelector from "./attributeSelector";

export default function CreatePost() {
  const { data: session } = useSession();

  const [showPreview, setShowPreview] = useState(false);
  const [recipeImagePreview, setRecipeImagePreview] = useState(null);
  const [recipeImageUpload, setRecipeImageUpload] = useState(null);
  const [formData, setFormData] = useState({
    recipe_name: "",
    recipe_time: "",
    recipe_cals: "",
    recipe_description: "",
    steps: [{ description: "" }],
    ingredients: [{ name: "" }],
    attributes: [],
  });

  const router = useRouter();
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setRecipeImagePreview(URL.createObjectURL(e.target.files[0]));
      setRecipeImageUpload(e.target.files[0]);
      setSelectedFile(e.target.files[0]);
    } else {
      setRecipeImagePreview(null);
      setRecipeImageUpload(null);
    }
  };

  const handlePreview = () => {
    setShowPreview(true);
    console.log(formData);
  };

  // custom button for "Choose File"
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Step 1: Get pre-signed URL for image upload
      const presignedUrlResponse = await fetch("/api/getUploadImageURL", {
        method: "POST",
        body: JSON.stringify({ id: session?.user?.name }),
      });

      if (!presignedUrlResponse.ok) {
        throw new Error("Failed to obtain pre-signed URL for image upload");
        return;
      }

      // Step 2: Get imageUrl and Upload image to pre-signed upload URL
      const { uploadUrl, imageUrl } = await presignedUrlResponse.json();

      const uploadImageResponse = await fetch(uploadUrl, {
        method: "PUT",
        body: recipeImageUpload,
        headers: {
          "Content-Type": "image/jpeg",
        },
      });

      if (!uploadImageResponse.ok) {
        throw new Error("Failed to upload image");
        return;
      }

      console.log("image uploaded to bucket");

      // Step 3: Create post with imageUrl
      const createPostResponse = await fetch("api/createPost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: session.user?.id,
          user_name: session.user?.name,
          recipe_name: formData.recipe_name,
          recipe_time: formData.recipe_time,
          recipe_cals: formData.recipe_cals,
          recipe_description: formData.recipe_description,
          recipe_image: imageUrl,
          recipe_steps: formData.steps,
          recipe_ingredients: formData.ingredients,
          recipe_attributes: formData.attributes,
        }),
      });

      if (!createPostResponse.ok) {
        throw new Error("Failed to create post");
        return;
      }

      const responseData = await createPostResponse.json();
      console.log(responseData, responseData.recipeId);

      // Handle successful post creation
      console.log("Post created successfully");
      router.push(`/recipes/${responseData.recipeId}`);
    } catch (error) {
      console.error("Error:", error.message);
      // Handle error
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="max-w-xl mx-auto p-6 shadow-md rounded-md my-26"
    >
      <h1 className="text-3xl font-semibold mb-4">Create New Post</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Recipe name section */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1" htmlFor="recipe_name">
            Recipe Title:
          </label>
          <input
            type="text"
            name="recipe_name"
            placeholder=""
            id="recipe_name"
            required
            value={formData.recipe_name}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:border-custom-main-dark"
          />
        </div>

        {/* Preperation section */}
        <div className="flex space-x-4 justify-between">
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1" htmlFor="recipe_time">
              Preparation Time (min):
            </label>
            <input
              type="number"
              name="recipe_time"
              placeholder=""
              id="recipe_time"
              required
              value={formData.recipe_time}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:border-custom-main-dark"
            />
          </div>

          {/* Calories section */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1" htmlFor="recipe_cals">
              Calories:
            </label>
            <input
              type="number"
              name="recipe_cals"
              placeholder=""
              id="recipe_cals"
              required
              value={formData.recipe_cals}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:border-custom-main-dark"
            />
          </div>
        </div>

        {/* Short Description section */}
        <div className="flex flex-col">
          <label
            className="text-sm font-medium mb-1"
            htmlFor="recipe_description"
          >
            Description:
          </label>
          <textarea
            name="recipe_description"
            placeholder="What about this dish..."
            id="recipe_description"
            required
            value={formData.recipe_description}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:border-custom-main-dark"
          />
        </div>

        {/* Upload image section */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1" htmlFor="recipe_image">
            Upload Image
          </label>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={handleButtonClick}
              className="bg-orange-400 hover:bg-orange-500 transition-colors ease-linear text-white px-3 py-1 rounded-md"
            >
              Choose File
            </button>
            <span className="text-gray-600">
              {selectedFile
                ? `File selected: ${selectedFile.name}`
                : "No file selected."}
            </span>
            <input
              ref={fileInputRef}
              name="recipe_image"
              id="recipe_image"
              type="file"
              accept="image/*"
              required
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
        </div>

        {/* Step Section */}
        <StepSection formData={formData} setFormData={setFormData} />

        {/* Ingredient Section */}
        <IngredientSection formData={formData} setFormData={setFormData} />

        {/* Attribute Section */}
        <AttributeSelector formData={formData} setFormData={setFormData} />

        {/* Preview Button */}
        <div className="flex items-center space-x-4 mt-4">
          <button
            type="button"
            className={`bg-custom-main-dark px-4 py-2 rounded-lg text-white hover:bg-opacity-70 transition-all ease-linear ${
              !recipeImageUpload ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handlePreview}
            disabled={!recipeImagePreview}
          >
            Preview
          </button>
        </div>

        {/* Preview Section */}
        {showPreview && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2 ml-3">Preview</h2>
            {/* Pass formData to the Post component */}
            <Post
              post={{
                ...formData,
                user_pfp: null,
                user_name: session.user?.name,
                recipe_name: formData.recipe_name,
                recipe_recipe_description: formData.recipe_description,
                recipe_cals: formData.recipe_cals,
                recipe_time: formData.recipe_time,
                recipe_image: recipeImagePreview,
              }}
              disabled
            />
          </div>
        )}
        {/* Publish Post Button*/}
        {showPreview && (
          <div className="flex items-center space-x-4 mt-4">
            <button
              type="submit"
              className="bg-custom-main-dark px-4 py-2 rounded-lg text-white hover:bg-opacity-70 transition-all ease-linear"
            >
              Publish Post
            </button>
          </div>
        )}
      </form>
    </motion.div>
  );
}
