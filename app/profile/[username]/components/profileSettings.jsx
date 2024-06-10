"use client";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import defaultPfp from "../../../../assets/icons/profile.svg";

export default function ProfileSettings({ setShowSettings, profileSettings }) {
  const { id, username, bio, pfpUrl } = profileSettings;
  const [updatedBio, setUpdatedBio] = useState(bio);
  const [isDeleteProcessing, setIsDeleteProcessing] = useState(false);

  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const settingsRef = useRef();
  const { data: session } = useSession();

  const handleClickOutside = (event) => {
    if (settingsRef.current && !settingsRef.current.contains(event.target)) {
      setShowSettings(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] ?? null;
    setFile(file);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleConfirmClick = async () => {
    try {
      const updatedFields = {};
      let presignedUrlResponse;

      if (file) {
        // Check if pre-signed URL already given
        if (pfpUrl) {
          // Get existing object key from URL
          const parts = pfpUrl.split("/");

          // Extract the date part (2024-03-17)
          const datePart = parts[parts.length - 2];

          // Extract the object key from the parts array
          const idPart = parts[parts.length - 1];

          // Combine the year and object key into a single string
          const objectKey = `${datePart}/${idPart}`;
          presignedUrlResponse = await fetch("/api/getUploadImageURL", {
            method: "POST",
            body: JSON.stringify({ id: id, existingKey: objectKey }),
          });
        } else {
          // image url does not already exist
          presignedUrlResponse = await fetch("/api/getUploadImageURL", {
            method: "POST",
            body: JSON.stringify({ id: id }),
          });
        }

        if (!presignedUrlResponse.ok) {
          throw new Error("Failed to obtain pre-signed URL for image upload");
          return;
        }

        // Step 2: Get imageUrl and Upload image to pre-signed upload URL
        const { uploadUrl, imageUrl } = await presignedUrlResponse.json();

        const uploadImageResponse = await fetch(uploadUrl, {
          method: "PUT",
          body: file,
          headers: {
            "Content-Type": "image/jpeg",
          },
        });

        if (!uploadImageResponse.ok) {
          throw new Error("Failed to upload image");
          return;
        }

        console.log("image uploaded to bucket");
        updatedFields.updatedPfp = imageUrl;
      }
      if (updatedBio !== bio) {
        // Check if bio updated
        updatedFields.updatedBio = updatedBio;
      }

      if (Object.keys(updatedFields).length > 0) {
        const res = await fetch("/api/updateUserInfo", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: id,
            ...updatedFields,
          }),
        });
        if (res.ok) {
          setShowSettings(false);
          window.location.reload();
        } else {
          console.error("Failed to update user information");
        }
      } else {
        console.log("No changes to update");
      }
    } catch (error) {
      console.error("Error updating user information:", error);
    }
  };
  const handleDeleteProfile = async (useSession) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete your profile? This action cannot be undone."
    );
    if (!confirmDelete) return;

    if (isDeleteProcessing) return;

    setIsDeleteProcessing(true);

    try {
      const res = await fetch("/api/deleteUser", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`, // Pass the session token
        },
        body: JSON.stringify({ userId: id }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert("Failed to delete profile: " + errorData.message);
      } else {
        const data = await res.json();
        alert(data.message);
        signOut(); // Sign out the user after deletion
      }
    } catch (error) {
      console.error("Failed to delete profile:", error);
      alert("Failed to delete profile. Please try again later.");
      setIsDeleteProcessing(false);
    }
  };
  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 m-auto max-w-10"
      onClick={handleClickOutside}
    >
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        ref={settingsRef}
        className="border-solid border-2 border-custom-main-dark rounded-lg backdrop-blur-md "
      >
        <div className="bg-custom-main-dark rounded-t-lg p-3">
          <h1 className="text-white text-2xl font-bold">Edit Profile</h1>
        </div>
        <div className="bg-white rounded-b-lg p-4">
          <div className="flex flex-col">
            <div className="flex justify-between items-center bg-orange-100 p-2 rounded-lg my-4">
              <div className="flex justify-center items-center">
                {/* Allow user to click on profile pic to select a new image */}
                <label htmlFor="pfpUrl" className="cursor-pointer">
                  <Image
                    src={previewUrl || pfpUrl || defaultPfp}
                    alt="Profile Picture"
                    className="rounded-full w-16 h-16"
                    width={100}
                    height={100}
                  />
                </label>
                <input
                  type="file"
                  id="pfpUrl"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <div className="mx-3 px-1 font-bold text-xl border-solid border border-[#A3A3A3] rounded-xl">
                  {username}
                </div>
              </div>
              <button
                className="ml-12 bg-custom-main-dark bg-opacity-100 text-white hover:bg-opacity-70 transition-colors ease-linear p-2 rounded-xl font-semibold"
                onClick={() => document.getElementById("pfpUrl").click()}
              >
                Change Photo
              </button>
            </div>
            <p className="font-semibold mt-4">Bio</p>
            <textarea
              maxLength="150"
              type="text"
              defaultValue={updatedBio}
              className="border border-[#A2A2A2] p-2 pb-16 rounded-lg mb-4 focus:outline-none focus:border-custom-main-dark"
              onChange={(e) => setUpdatedBio(e.target.value)}
            />
          </div>
          <div>
            <button
              onClick={() => signOut()}
              className="bg-[#575A65] bg-opacity-60 hover:bg-opacity-100 transition-colors ease-linear px-4 py-2 rounded-lg text-white"
            >
              Log Out
            </button>
            <button
              className="bg-custom-main-dark bg-opacity-100 hover:bg-opacity-70 text-white transition-colors ease-linear p-2 px-8 ml-60 mt-4 mb-2 rounded-xl font-semibold"
              onClick={handleConfirmClick}
            >
              Confirm
            </button>
            <button
              className="bg-opacity-100 hover:bg-opacity-70 bg-red-500 text-white transition-colors ease-linear p-2 px-5 ml-5 mt-4 mb-2 rounded-xl font-semibold"
              onClick={handleDeleteProfile}
              disabled={isDeleteProcessing}
            >
              Delete Profile
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
