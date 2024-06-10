"use client";
import FollowsModal from "./followsModal";
import { useState } from "react";

export default function FollowersInfo({ followerCount, followingCount }) {
  const [showFollowersContent, setShowFollowersContent] = useState(false);
  const [showFollowingContent, setShowFollowingContent] = useState(false);

  const handleFollowersClick = () => {
    setShowFollowersContent(!showFollowersContent);
  };

  const handleFollowingClick = () => {
    setShowFollowingContent(!showFollowingContent);
  };
  return (
    <>
      <div
        onClick={handleFollowersClick}
        className="cursor-pointer text-center mx-5"
      >
        <h2 className="text-sm font-semibold mb-1">{followerCount}</h2>
        <p className="text-xs text-gray-500">Followers</p>
      </div>
      <div
        className="text-center cursor-pointer"
        onClick={handleFollowingClick}
      >
        <h2 className="text-sm font-semibold mb-1">{followingCount}</h2>
        <p className="text-xs text-gray-500">Following</p>
      </div>
      {showFollowersContent && (
        <FollowsModal
          setShowFollows={setShowFollowersContent}
          title={"Followers"}
        />
      )}
      {showFollowingContent && (
        <FollowsModal
          setShowFollows={setShowFollowingContent}
          title={"Follows"}
        />
      )}
    </>
  );
}
