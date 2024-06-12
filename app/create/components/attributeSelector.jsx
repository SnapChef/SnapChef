import React from "react";

const options = [
  { label: "Gluten Free", icon: "🌾", tag: "glutenFree" },
  { label: "High Protein", icon: "💪", tag: "highProtein" },
  { label: "Vegan", icon: "🌱", tag: "vegan" },
  // Add other relevant options here
];

export default function AttributeSelector({ formData, setFormData }) {
  const handleOptionSelection = (selectedOption) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      attributes: selectedOption,
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
              onChange={(e) => {
                const isChecked = e.target.checked;
                const selectedOption = e.target.value;

                if (isChecked) {
                  handleOptionSelection([
                    ...formData.attributes,
                    selectedOption,
                  ]);
                } else {
                  handleOptionSelection(
                    formData.attributes.filter(
                      (attr) => attr !== selectedOption
                    )
                  );
                }
              }}
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
