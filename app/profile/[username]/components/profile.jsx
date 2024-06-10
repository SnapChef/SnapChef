import Image from "next/image";
import defaultPfp from "../../../../assets/icons/profile.svg";
import CurrentProfile from "./currentProfile";

export default function Profile({ profile }) {
  const {
    id,
    username,
    postCount,
    followerCount,
    followingCount,
    bio,
    pfpUrl,
  } = profile?.user;

  return (
    <div className="flex">
      {/* Left side: Profile information */}
      <div className="w-1/4 p-10 fixed">
        {/* Profile picture */}

        <div className="mb-4 flex flex-col items-center">
          <Image
            src={pfpUrl ? pfpUrl : defaultPfp}
            alt="Profile Picture"
            width={100}
            height={100}
            style={{
              width: pfpUrl ? "100px" : "110px", // Change width based on pfpUrl presence
              height: pfpUrl ? "100px" : "110px", // Change height based on pfpUrl presence
              objectFit: "cover",
            }}
            className="rounded-full"
          />
          {/* Username with setting icon */}
          <div className="flex items-center mb-4 mt-2">
            <p className="text-xl font-bold mr-2">{username}</p>
            <CurrentProfile
              id={id}
              username={username}
              bio={bio}
              pfpUrl={pfpUrl ? pfpUrl : defaultPfp}
            />
          </div>

          {/* Counts */}
          <div className="mx-28">
            <div className="mb-3 flex justify-between">
              <div className="text-center">
                <h2 className="text-sm font-semibold mb-1">{postCount}</h2>
                <p className="text-xs text-gray-500">Posts</p>
              </div>
              <div className="text-center mx-5">
                <h2 className="text-sm font-semibold mb-1">{followerCount}</h2>
                <p className="text-xs text-gray-500">Followers</p>
              </div>
              <div className="text-center">
                <h2 className="text-sm font-semibold mb-1">{followingCount}</h2>
                <p className="text-xs text-gray-500">Following</p>
              </div>
            </div>

            {/* Account bio */}
            <div>
              <p className="mt-5 text-xs text-black-500">{bio}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
