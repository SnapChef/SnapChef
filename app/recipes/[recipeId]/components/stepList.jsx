"use client";

import { useState } from "react";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";

const StepList = ({ steps }) => {
  const [expandedStep, setExpandedStep] = useState([
    ...Array(steps.length).keys(),
  ]);

  const toggleStep = (index) => {
    if (expandedStep.includes(index)) {
      setExpandedStep(expandedStep.filter((stepIndex) => stepIndex !== index));
    } else {
      setExpandedStep([...expandedStep, index]);
    }
  };

  return (
    <div className="mb-8 max-w-lg">
      <p className="text-2xl font-bold mb-5">Steps</p>
      <ul>
        {steps.map((step, index) => (
          <li key={index} className="mb-5">
            <button
              onClick={() => toggleStep(index)}
              className="flex items-center  focus:outline-none"
            >
              <p className="text-lg font-bold">{step.header}</p>
              {expandedStep.includes(index) ? (
                <IoIosArrowDropup className="ml-1" />
              ) : (
                <IoIosArrowDropdown className="ml-1" />
              )}
            </button>
          <AnimatePresence>
            {expandedStep.includes(index) && (
              <motion.p
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto"}}
                exit={{ opacity: 0, y: -10, height: 0 }}
                className="text-md">
                {step.description}
              </motion.p>
            )}
          </AnimatePresence>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StepList;
