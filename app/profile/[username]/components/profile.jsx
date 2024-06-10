import Image from "next/image";
import defaultPfp from "../../../../assets/icons/profile.svg";
import CurrentProfile from "./currentProfile";
import FollowersInfo from "./followersInfo";

export default function Profile({ profile }) {
  const {
    id,
    username,
    postCount,
    followerCount,
    followingCount,
    bio,
    pfpUrl,
    followers,
    following,
  } = profile?.user;

  return (
    <div className="flex">
      <div className="w-1/4 p-10 fixed">
        <div className="mb-4 flex flex-col items-center">
          <Image
            src={pfpUrl ? pfpUrl : defaultPfp}
            alt="Profile Picture"
            width={100}
            height={100}
            style={{
              width: pfpUrl ? "100px" : "110px",
              height: pfpUrl ? "100px" : "110px",
              objectFit: "cover",
            }}
            className="rounded-full"
          />
          <div className="flex items-center mb-4 mt-2">
            <p className="text-xl font-bold mr-2">{username}</p>
            <CurrentProfile
              id={id}
              username={username}
              bio={bio}
              pfpUrl={pfpUrl ? pfpUrl : null}
            />
          </div>

          <div className="mx-28">
            <div className="mb-3 flex justify-between">
              <div className="text-center">
                <h2 className="text-sm font-semibold mb-1">{postCount}</h2>
                <p className="text-xs text-gray-500">Posts</p>
              </div>
              <FollowersInfo
                followers={followers}
                following={following}
                followerCount={followerCount}
                followingCount={followingCount}
              />
            </div>

            <div>
              <p className="mt-5 text-xs text-black-500">{bio}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
