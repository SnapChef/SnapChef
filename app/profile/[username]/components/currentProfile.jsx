"use client";

import FollowButton from "../../../../components/followButton";
import ProfileSettings from "./profileSettings";
import { IoMdSettings } from "react-icons/io";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function CurrentProfile({ id, username, bio, pfpUrl }) {
  const { data: session } = useSession();
  const [showSettings, setShowSettings] = useState(false); // State to control the visibility of Settings component
  const [isCurrentUserProfile, setIsCurrentUserProfile] = useState(null);

  const handleSettingsClick = () => {
    setShowSettings(!showSettings); // Toggle the visibility of Notifications component
  };

  useEffect(() => {
    // Check if session data is available and if the current user is viewing their own profile
    if (session && session.user.id === id) {
      setIsCurrentUserProfile(true);
    } else {
      setIsCurrentUserProfile(false);
    }
  }, [session, id]);

  if (isCurrentUserProfile === null) {
    return null;
  }

  return (
    <div>
      {isCurrentUserProfile ? (
        <IoMdSettings
          className="cursor-pointer"
          onClick={handleSettingsClick}
          color={showSettings ? "#FF9103" : "#A3A3A3"}
          size={30}
        />
      ) : (
        <FollowButton targetId={id} />
      )}
      {showSettings && (
        <ProfileSettings
          setShowSettings={setShowSettings}
          profileSettings={{
            id,
            username,
            bio,
            pfpUrl,
          }}
        />
      )}
    </div>
  );
}
