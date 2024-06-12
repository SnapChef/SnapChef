import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const StepSection = ({ steps, setSteps, formData, setFormData }) => {
  const currentSteps = steps || formData.steps;
  const updateSteps = setSteps || ((newSteps) => setFormData((prevFormData) => ({ ...prevFormData, steps: newSteps })));

  const handleStepChange = (index, value) => {
    const newSteps = [...currentSteps];
    newSteps[index].description = value;
    updateSteps(newSteps);
  };

  const handleHeaderChange = (index, value) => {
    const newSteps = [...currentSteps];
    newSteps[index].header = value;
    updateSteps(newSteps);
  };

  const addStep = () => {
    updateSteps([...currentSteps, { header: `Step ${currentSteps.length + 1}`, description: "" }]);
  };

  const removeStep = (index) => {
    if (currentSteps.length === 1) {
      return; // Do not remove if it's the only step
    }
    const newSteps = [...currentSteps];
    newSteps.splice(index, 1);
    updateSteps(newSteps);
  };

  return (
    <>
      <AnimatePresence>
        {currentSteps.map((step, index) => (
          <motion.div
            key={index}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="flex flex-col mb-4"
          >
            <div className="flex items-center mb-2">
              <input
                type="text"
                value={step.header}
                onChange={(e) => handleHeaderChange(index, e.target.value)}
                placeholder={`Step ${index + 1}`}
                className="border border-gray-300 p-2 rounded-md focus:outline-none focus:border-custom-main-dark"
              />
            </div>
            <textarea
              rows={3}
              value={step.description}
              onChange={(e) => handleStepChange(index, e.target.value)}
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:border-custom-main-dark"
              required
            />
            <button
              type="button"
              onClick={() => removeStep(index)}
              className={`mt-2 ${
                currentSteps.length === 1
                  ? "bg-[#575A65] opacity-50 cursor-not-allowed"
                  : "bg-red-500"
              } transition-colors ease-linear text-white px-4 py-2 rounded-md hover:bg-red-600`}
              disabled={currentSteps.length === 1}
            >
              Remove Step
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
      <button
        type="button"
        onClick={addStep}
        className="bg-green-500 transition-colors ease-linear text-white px-4 py-2 rounded-md hover:bg-green-600"
      >
        Add Step
      </button>
    </>
  );
};

export default StepSection;