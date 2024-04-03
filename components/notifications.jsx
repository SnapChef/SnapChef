import React, { useRef } from "react";
import { motion } from "framer-motion";
import NotifContent from "./notifContent";

import profileImage from "../assets/abu_yezan.png";
import postPic from "../assets/zeytandzaa.png";

export default function Notifications({ setShowNotifications }) {
  const notifRef = useRef();

  const handleClickOutside = (event) => {
    if (notifRef.current && !notifRef.current.contains(event.target)) {
      setShowNotifications(false);
    }
  };

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-10"
      onClick={handleClickOutside}
    >
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        ref={notifRef}
        className="border-solid border-2 border-custom-main-dark rounded-lg backdrop-blur-md"
      >
        <div className="bg-custom-main-dark rounded-t-lg p-3">
          {/* Orange background for top */}
          {/* Title */}
          <h1 className="text-white text-xl font-bold">Notifications</h1>
        </div>
        <div className="bg-white rounded-b-lg p-4">
          {" "}
          {/* White background for rest */}
          {/* Notifications Content */}
          <NotifContent
            notifContent={{
              profilePic: profileImage,
              userName: "Joe_Mama",
              notifMsg: "liked your post.",
              time: "1m",
              interactedPost: postPic,
            }}
          />
          <NotifContent
            notifContent={{
              profilePic: profileImage,
              userName: "user",
              notifMsg: "liked your post.",
              time: "1h",
              interactedPost: postPic,
            }}
          />
          <NotifContent
            notifContent={{
              profilePic: profileImage,
              userName: "user",
              notifMsg: "started following you.",
              time: "2h",
            }}
          />
          <NotifContent
            notifContent={{
              profilePic: profileImage,
              userName: "Someone",
              notifMsg: "liked your post.",
              time: "2h",
              interactedPost: postPic,
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}
