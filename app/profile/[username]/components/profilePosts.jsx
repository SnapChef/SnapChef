"use client";

import { FaRegHeart } from "react-icons/fa";
import { motion } from "framer-motion";
import Image from "next/image";

export default function ProfilePosts({ posts }) {
  const { title, likeCount, imageURL } = posts;

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="mx-auto max-w-[300px]"
    >
      {/* Left side: Profile information */}
      <div>
        {/* Post Picture */}
        {imageURL && (
          <div className="flex bg-orange-100 p-5 rounded-lg flex-col items-center transition-all ease-linear border-opacity-0 border-custom-main-dark hover:border-opacity-50 border-2">
            <Image
              src={imageURL}
              alt="My Post"
              className="mb-2"
              height={200}
              width={200}
              style={{
                width: "200px",
                height: "200px",
                objectFit: "cover",
                borderRadius: "10px",
              }} //remove border if wanting to remove black outline
            />

            {/* Title with Likes */}
            <div className="flex items-center justify-between w-[200px]">
              <p className="text-md font-bold mr-2">{title}</p>
              <div className="flex flex-col items-center">
                <FaRegHeart
                  className="cursor-pointer"
                  color="FF9103"
                  size={20}
                />
                <p className="text-sm font-medium text-custom-main-dark">
                  {likeCount}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
