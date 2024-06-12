"use client";

import Link from "next/link";
import { useState } from "react";
import { FaGoogle, FaRegUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function SignInBox() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [animateError, setAnimateError] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (res.error) {
        console.log("error", res.error);
        setError("Invalid Credentials.");
        setAnimateError(true);

        setTimeout(() => {
          setAnimateError(false);
        }, 2500);

        return;
      }

      router.replace("/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -400 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="mt-8"
    >
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <div className="rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
          {/* Sign In Section */}
          <div className="w-3/5 p-5">
            <h2 className="text-3xl font-bold text-custom-main-dark mt-10 mb-2">
              Sign In
            </h2>
            <div className="border-2 w-10 border-custom-main-dark inline-block mb-2"></div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center"
            >
              {/* Username */}
              <h1 className="flex w-64 text-xs">Username</h1>
              <div className="bg-gray-200 w-64 p-2 flex items-center m-2 rounded-2xl">
                <FaRegUser className="text-gray-400 m-2" />
                <input
                  onChange={(e) => setUsername(e.target.value)}
                  type="username"
                  name="username"
                  placeholder="Enter your username"
                  className="border-2 bg-gray-200 
                              outline-none text-sm flex-1"
                />
              </div>
              {/* END OF: Username */}
              {/* Password */}
              <h1 className="flex w-64 text-xs">Password</h1>
              <div className="bg-gray-200 w-64 p-2 flex items-center m-2 rounded-2xl">
                <RiLockPasswordLine className="text-gray-400 m-2" />
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="border-2 bg-gray-200 
                              outline-none text-sm flex-1"
                />
              </div>
              {/* END OF: Password */}
              <div className="flex w-64 mb-2 justify-between text-gray-600">
                <label className="flex items-center text-xs">
                  <input type="checkbox" name="remember" className="mr-1" />{" "}
                  Remember Me
                </label>
                <a href="#" className="text-xs">
                  Forgot Password?
                </a>
              </div>
              {error && (
                <motion.div
                  key={Date.now()}
                  initial={{ scale: 0 }}
                  animate={animateError && { scale: 1 }}
                  className={
                    "flex w-64 bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md"
                  }
                >
                  {error}
                </motion.div>
              )}
              <button
                className="border-2 border-custom-main-dark text-custom-main-dark rounded-full mt-2 px-12 py-2 inline-block font-semibold
                           transition-colors ease-linear hover:bg-custom-main-dark hover:text-white"
              >
                Sign In
              </button>
              {/* removed Google sign-in for now */}
              <p className="text-gray-400 my-4"> or </p>
              <div className="flex justify-center">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    signIn("google");
                  }}
                  className="border-2 border-gray-400 rounded-full p-4 mx-1 transition-colors ease-linear hover:bg-custom-main-dark hover:text-white"
                >
                  <FaGoogle className="text-sm" />
                </button>
              </div>
            </form>
          </div>
          {/* END OF: Sign In Section */}
          {/*Register Section */}
          <div className="w-2/5 bg-custom-main-dark text-white rounded-tr-2xl rounded-br-2xl py-36 px-12">
            <h2 className="text-3xl font-bold mb-2">Create Account</h2>
            <div className="border-2 w-10 border-white inline-block mb-2"></div>
            <p className="mb-10">Start saving recipes today!</p>
            <Link
              href="/signup"
              className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold transition-colors ease-linear 
                    hover:bg-white hover:text-custom-main-dark"
            >
              Sign Up
            </Link>
          </div>
          {/* END OF: Register Section */}
        </div>
      </main>
    </motion.div>
  );
}
