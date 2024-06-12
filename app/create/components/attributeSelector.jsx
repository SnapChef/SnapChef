import React, { useEffect, useState } from "react";

const options = [
  { label: "Gluten Free", icon: "🌾", tag: "glutenFree" },
  { label: "High Protein", icon: "💪", tag: "highProtein" },
  { label: "Vegan", icon: "🌱", tag: "vegan" },
  // add new options here
];

export default function AttributeSelector({ formData, setFormData }) {
  const [attributes, setAttributes] = useState([]);

  useEffect(() => {
    if (formData && formData.recipe_attributes && Array.isArray(formData.recipe_attributes)) {
      setAttributes(formData.recipe_attributes);
    }
  }, [formData]);

  const handleOptionSelection = (selectedOption) => {
    const updatedAttributes = attributes.includes(selectedOption)
      ? attributes.filter((attr) => attr !== selectedOption)
      : [...attributes, selectedOption];
    setAttributes(updatedAttributes);
    setFormData((prevFormData) => ({
      ...prevFormData,
      recipe_attributes: updatedAttributes,
    }));
  };

  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium mb-1">Select option(s):</label>
      <div className="space-y-2">
        {options.map((option, index) => (
          <label key={index} className="flex items-center space-x-2">
            <input
              type="checkbox"
              value={option.tag}
              checked={attributes.includes(option.tag)}
              onChange={(e) => handleOptionSelection(e.target.value)}
              className="form-checkbox"
            />
            <span className="text-lg">{option.icon}</span>
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
