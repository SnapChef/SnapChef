"use client";

import { FaFireFlameCurved } from "react-icons/fa6";
import { IoIosTimer } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function Post({ post }) {
  const {
    _id,
    user_name,
    user_pfp,
    recipe_name,
    recipe_image, // stores image url from cloudfront stored in s3 bucket
    recipe_description,
    recipe_likes,
    recipe_time,
    recipe_cals,
  } = post;

  const truncateText = (text) => {
    return text.length > 44 ? text.slice(0, 44) + "..." : text; //reduced from 50 -> 44 to make images consistent with posts
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="bg-orange-100 p-7 rounded-xl flex items-center justify-center mx-auto max-w-[400px] transition-all ease-linear border-opacity-0 border-custom-main-dark hover:border-opacity-50 border-2"
    >
      {/* Display the square image if imageURL is provided */}
      {recipe_image && (
        <div>
          <Link
            href={`/profile/${user_name}`}
            className="flex items-center hover:underline hover:cursor-pointer hover:opacity-70 transition-opacity ease-linear"
          >
            {user_pfp ? (
              <Image
                src={user_pfp}
                className="rounded-full mr-2 mb-1"
                height={30}
                width={30}
                style={{
                  width: "30px",
                  height: "30px",
                  objectFit: "cover",
                }}
                alt={user_name}
              />
            ) : (
              <FaUserCircle className="mr-2 text-2xl text-custom-main-dark" />
            )}
            <p className="text-xl mb-1">{user_name}</p>
          </Link>
          <Link
            href={`/recipes/${_id}`}
            className="hover:opacity-80 transition-opacity ease-linear"
          >
            <Image
              src={recipe_image}
              alt="Post Image"
              width={300}
              height={300}
              style={{
                width: "300px",
                height: "250px",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
            <h2 className="font-sans text-xl text-gray-800 font-bold mt-3">
              {recipe_name}
            </h2>
            <div className="flex items-center mt-2 justify-between">
              <div className="flex">
                <div className="flex flex-col items-center mr-4">
                  <IoIosTimer />
                  <p className="font-sans text-xs text-gray-500">
                    {recipe_time} mins
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <FaFireFlameCurved className="text-red-500" />
                  <p className="font-sans text-xs text-gray-500">
                    {recipe_cals} cals
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <FaRegHeart style={{ color: "#FF8C00" }} size={20} />
                {recipe_likes}
              </div>
            </div>
            <p className="font-sans text-sm text-gray-800 mt-3">
              {truncateText(recipe_description)}
            </p>
          </Link>
        </div>
      )}
    </motion.div>
  );
}
