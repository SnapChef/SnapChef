"use client";
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import FollowsContent from "./followsContent";
import { fetchFollows } from "@/actions/fetches";
import defaultPfp from "../../../../assets/icons/profile.svg";

export default function FollowsModal({ setShowFollows, title, userIds }) {
  const [users, setUsers] = useState([]);
  const followsRef = useRef();

  const handleClickOutside = (event) => {
    if (followsRef.current && !followsRef.current.contains(event.target)) {
      setShowFollows(false);
    }
  };

  useEffect(() => {
    const fetchUserFollows = async () => {
      try {
        const userList = await fetchFollows(userIds);
        if (!userList || userList.error || userList.message) {
          console.log("user error", userList.error);
          return;
        }
        setUsers(userList.users);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserFollows();
  }, [userIds]);

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
          <h1 className="text-white text-xl font-bold">{title}</h1>
        </div>
        <div className="bg-white rounded-b-lg p-4">
          {users.length === 0 ? (
            <p className="p-10">No Users Found.</p>
          ) : (
            users.map((user) => (
              <FollowsContent
                key={user.id}
                followsContent={{
                  username: user.username,
                  pfpUrl: user.pfpUrl ? user.pfpUrl : defaultPfp,
                }}
              />
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
}
