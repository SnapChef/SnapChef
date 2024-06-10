import Image from "next/image";

export default function FollowsContent({ followsContent }) {
  const { id, username, pfpUrl } = followsContent;

  return (
    <div className="flex justify-between items-center bg-orange-100 p-1 px-3 pr-24 sm:pr-44 w-full rounded-2xl my-4 mb-2">
      <div className="flex justify-center items-center">
        <Image
          src={pfpUrl}
          alt="Profile Picture"
          className="rounded-full w-16 h-16"
          width={100}
          height={100}
        />
        <div className="mx-3 font-semibold text-xl rounded-xl">{username}</div>
      </div>
    </div>
  );
}
