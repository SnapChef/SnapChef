import { IoIosTimer } from "react-icons/io";
import { FaFireFlameCurved } from "react-icons/fa6";
import { LuVegan } from "react-icons/lu";
import { GiChickenOven } from "react-icons/gi";
import { GiWheat } from "react-icons/gi";

export default function AttributeList({ attributes, time, cals }) {
  // Map attribute names to their respective icons
  const attributeData = {
    highProtein: {
      icon: <GiChickenOven style={{ color: "orange", fontSize: "24px" }} />,
      text: "High Protein",
    },
    vegan: {
      icon: <LuVegan style={{ color: "green", fontSize: "24px" }} />,
      text: "Vegan",
    },
    glutenFree: {
      icon: <GiWheat style={{ color: "brown", fontSize: "24px" }} />,
      text: "Gluten Free",
    },
  };

  return (
    <div>
      <div className="flex items-center">
        <div className="flex flex-col items-center mr-4">
          <IoIosTimer className="text-2xl" />
          <p className="font-sans text-xs mt-1 text-gray-500">{time} mins </p>
        </div>
        <div className="flex flex-col items-center">
          <FaFireFlameCurved className="text-red-500 text-2xl" />
          <p className="font-sans text-xs mt-1 text-gray-500">{cals} cals</p>
        </div>
        {attributes.map((attribute, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center ml-6"
          >
            {attributeData[attribute].icon}
            <p className="font-sans text-xs mt-1 text-gray-500">
              {attributeData[attribute].text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
