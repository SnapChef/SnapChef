"use client";
import React, { useState } from "react";

export default function SortFilterDropdown() {
  const [selectedAttribute, setSelectedAttribute] = useState("");

  const attributes = [
    { value: "highProtein", label: "High Protein" },
    { value: "vegan", label: "Vegan" },
    { value: "glutenFree", label: "Gluten Free" },
  ];

  const handleSelectAttribute = (value) => {
    setSelectedAttribute(value);
    window.location.href = `/filter/${value}`;
  };

  return (
    <div className="px-12 flex justify-between sm:block hidden">
      <select
        className="block w-full py-2 px-1 border border-gray-300 bg-white rounded-md shadow-sm focus:border-custom-main-dark text-center"
        value={selectedAttribute}
        onChange={(e) => handleSelectAttribute(e.target.value)}
      >
        <option className="text-center" value="">
          Sort
        </option>
        {attributes.map((attribute) => (
          <option key={attribute.value} value={attribute.value}>
            {attribute.label}
          </option>
        ))}
      </select>
    </div>
  );
}
