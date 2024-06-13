"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Home from "../assets/icons/home.svg";
import HomeFill from "../assets/icons/homeFill.svg";
import Bell from "../assets/icons/bell.svg";
import BellFill from "../assets/icons/bellFill.svg";
import Post from "../assets/icons/post.svg";
import PostFill from "../assets/icons/postFill.svg";
import Fav from "../assets/icons/favorites.svg";
import FavFill from "../assets/icons/favoritesFill.svg";
import Profile from "../assets/icons/profile.svg";
import ProfileFill from "../assets/icons/profileFill.svg";
import Notifications from "./notifications";

import { useSession } from "next-auth/react";

function MobileNavbarIcons() {
  const pathname = usePathname();
  const [activePath, setActivePath] = useState("");
  const [showNotifications, setShowNotifications] = useState(false); // State to control the visibility of Notifications component

  const { data: session } = useSession();

  const handleBellClick = () => {
    setShowNotifications(!showNotifications); // Toggle the visibility of Notifications component
  };

  useEffect(() => {
    setActivePath(pathname);
  }, [pathname]);

  const isLinkActive = (path) => path === activePath;

  return (
    <>
      <div className="block fixed bottom-0 sm:hidden bg-white p-4 w-full items-center">
        <ul className="flex justify-between gap-8 list-none">
          <Link href="/home">
            <Image
              src={isLinkActive("/home") ? HomeFill : Home}
              alt="Home"
              className="nav-icon cursor-pointer"
              width={40}
              height={40}
            />
          </Link>
          <div className="nav-icon cursor-pointer" onClick={handleBellClick}>
            <Image
              src={showNotifications ? BellFill : Bell}
              alt="Bell"
              width={40}
              height={40}
            />
          </div>
          <Link href="/create">
            <Image
              src={isLinkActive("/create") ? PostFill : Post}
              alt="Post"
              className="nav-icon cursor-pointer"
              width={40}
              height={40}
            />
          </Link>
          <Link href={`/favorites/${session?.user?.name}`}>
            <Image
              src={
                isLinkActive(`/favorites/${session?.user?.name}`)
                  ? FavFill
                  : Fav
              }
              alt="Home"
              className="nav-icon cursor-pointer"
              width={40}
              height={40}
            />
          </Link>
          <Link href={`/profile/${session?.user?.name}`}>
            <Image
              src={
                isLinkActive(`/profile/${session?.user?.name}`)
                  ? ProfileFill
                  : Profile
              }
              alt="Home"
              className="nav-icon cursor-pointer"
              width={40}
              height={40}
            />
          </Link>
        </ul>
      </div>

      {showNotifications && (
        <Notifications setShowNotifications={setShowNotifications} />
      )}
    </>
  );
}

export default MobileNavbarIcons;
