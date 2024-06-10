"use client";
import React, { useRef } from "react";
import { motion } from "framer-motion";
import FollowsContent from "./followsContent";
import defaultPfp from "../../../../assets/icons/profile.svg";

export default function FollowsContainer({ setShowFollows, followsContainer }) {
  const followsRef = useRef();

  const handleClickOutside = (event) => {
    if (followsRef.current && !followsRef.current.contains(event.target)) {
      setShowFollows(false);
    }
  };

  const { title } = followsContainer;
  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-10"
      onClick={handleClickOutside}
    >
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        ref={followsRef}
        className="border-solid border-2 border-custom-main-dark rounded-lg backdrop-blur-md"
      >
        <div className="bg-custom-main-dark rounded-t-lg p-3">
          {/* Orange background for top */}
          {/* Title */}
          <h1 className="text-white text-xl font-bold">{title}</h1>
        </div>
        <div className="bg-white rounded-b-lg p-4">
          {" "}
          {/* White background for rest */}
          {/* Follows Content */}
          <FollowsContent
            followsContent={{
              id: "123",
              username: "joemama", // Ensure the username is correctly defined here
              pfpUrl: defaultPfp,
            }}
          />
          <FollowsContent
            followsContent={{
              id: "123",
              username: "joemama", // Ensure the username is correctly defined here
              pfpUrl: defaultPfp,
            }}
          />
          <FollowsContent
            followsContent={{
              id: "123",
              username: "joemama", // Ensure the username is correctly defined here
              pfpUrl: defaultPfp,
            }}
          />
          <FollowsContent
            followsContent={{
              id: "123",
              username: "joemama", // Ensure the username is correctly defined here
              pfpUrl: defaultPfp,
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}
