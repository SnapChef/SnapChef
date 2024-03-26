import Image from "next/image";

export default function NotifContent({ notifContent }) {
    const { profilePic, userName, notifMsg, time, interactedPost } = notifContent;

  return (
    <div className="flex mt-2 justify-between">
        {/* Profile picture */}
        {interactedPost && (
          <div className="flex m-1 mt-2 items-center w-full justify-between">
            <Image src={profilePic} alt="Profile Picture" className="rounded-full w-10 h-10" />

            {/* Username */}
            <div className="flex m-1">
              <p className="text-md font-bold m-1">{userName}</p>
              <p className="text-md m-1">{notifMsg}</p>
              <p className="text-md text-slate-300 m-1">{time}</p>
            </div>
            
                <div className="flex ml-auto">
                <Image src={interactedPost} alt="A Post" className="m-1 rounded-lg w-20 h-20" />
                </div>
          </div>
        )}

        {!interactedPost && (
          <div className="flex my-6 m-1 items-center">
            <Image src={profilePic} alt="Profile Picture" className="rounded-full w-10 h-10" />
            <div className="flex m-1">
              <p className="text-md font-bold m-1">{userName}</p>
              <p className="text-md m-1">{notifMsg}</p>
              <p className="text-md text-slate-300 m-1">{time}</p>
            </div>
          </div>
        )}
                

      </div>
  );
}
