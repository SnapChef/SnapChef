import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import SignInModal from "../app/signin/components/signInModal";
import { motion } from "framer-motion";

export default function FollowButton({ targetId }) {
  const [isFollowing, setIsFollowing] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const { data: session } = useSession();

  useEffect(() => {
    const fetchFollowing = async () => {
      if (session) {
        try {
          const userData = await fetch(`/api/fetchProfile`, {
            method: "POST",
            body: JSON.stringify({ username: session.user.name }),
          });
          const responseJson = await userData.json();
          setIsFollowing(responseJson.user.following.includes(targetId));
        } catch (error) {
          console.error("Error fetching user data following:", error);
        }
      }
    };

    fetchFollowing();
  }, [session]);

  const handleUpdateFollow = async () => {
    if (!session) {
      setShowModal(true);
      return;
    }

    try {
      const method = !isFollowing ? "PATCH" : "DELETE";
      const response = await fetch("/api/updateFollow", {
        method,
        body: JSON.stringify({
          user_id: session.user.id,
          target_user_id: targetId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to update like count");
      }

      const responseData = await response.json();
      console.log(responseData);
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error("Error updating like count:", error);
    }
  };
  if (isFollowing === null) {
    return null;
  }

  return (
    <div className="flex-row items-center justify-center">
      {isFollowing ? (
        <motion.button
          whileTap={{ scale: 1.5 }}
          className="m-2 py-1 px-2 text-custom-main-dark text-sm hover:cursor-pointer rounded-md border border-custom-main-dark hover:opacity-50"
          onClick={handleUpdateFollow}
        >
          Following
        </motion.button>
      ) : (
        <motion.button
          whileTap={{ scale: 1.5 }}
          className="m-2 py-1 px-2 bg-custom-main-dark text-sm hover:cursor-pointer rounded-md text-white hover:opacity-70"
          onClick={handleUpdateFollow}
        >
          Follow
        </motion.button>
      )}
      {showModal && <SignInModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
