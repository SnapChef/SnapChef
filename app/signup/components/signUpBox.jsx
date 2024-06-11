"use client";

import Link from "next/link";
import { FaGoogle, FaRegUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";

export default function SignUpBox() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    //if no input is in either field
    if (!username || !password || !confirmPassword) {
      setError("All fields are necessary.");
      return;
    }
    if (username.length < 3 || username.length > 20) {
      setError("Username must be between 3 and 20 characters.");
      return;
    }

    if (password.length < 6 || password.length > 20) {
      setError("Password must be between 6 and 20 characters.");
      return;
    }
    
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const passwordReg = /^(?=.*[A-Z]).{6,}$/;
    if (!passwordReg.test(password)) {
      setError(
        "Password must be at least 6 characters long and contain at least one uppercase letter."
      );
      return;
    }
    
    try {
      //checking user existence
      const resUserExists = await fetch("api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });

      const { user } = await resUserExists.json();

      if (user) {
        setError("Username already exists.");
        return; // Don't proceed with registration
      }

      //registering user, passing to DB
      const res = await fetch("api/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (res.ok) {
        const form = e.target;
        form.reset();
        setError("");
        console.log("Created user!");
        const res = await signIn("credentials", {
          username,
          password,
          redirect: false,
        });

        if (res.error) {
          setError("Invalid Credentials.");
          setAnimateError(true);

          setTimeout(() => {
            setAnimateError(false);
          }, 2500);

          return;
        }

        router.replace("profile");
        router.push("/home");
      } else {
        setError("Error. Refresh and try again.");
        console.log("User registration failed.", error);
      }
    } catch (error) {
      console.log("Error during registration: ", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 400 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="mt-8"
    >
      {/* Sign Up Box */}
      <main className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center px-10 text-center rounded-2xl shadow-2xl max-w-xl">
          <div className="w-4/5 p-5">
            <div className="py-10">
              <h2 className="text-3xl font-bold text-custom-main-dark mb-2">
                Create Account
              </h2>
              <div className="border-2 w-10 border-custom-main-dark inline-block mb-2"></div>
              <p className=" text-xs mb-2">Fill in your credentials below.</p>
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
                    placeholder="Enter username"
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
                    placeholder="Enter password"
                    className="border-2 bg-gray-200 
                                outline-none text-sm flex-1"
                  />
                </div>
                <h1 className="flex w-64 text-xs">Confirm Password</h1>
                <div className="bg-gray-200 w-64 p-2 flex items-center m-2 rounded-2xl">
                  <RiLockPasswordLine className="text-gray-400 m-2" />
                  <input
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    className="border-2 bg-gray-200 
                                outline-none text-sm flex-1"
                  />
                </div>
                {/* END OF: Password */}
                {error && (
                  <div className="flex w-64 bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                    {error}
                  </div>
                )}
                <button
                  className="border-2 border-custom-main-dark text-custom-main-dark rounded-full px-12 py-2 mt-5 inline-block font-semibold
                             transition-colors ease-linear hover:bg-custom-main-dark hover:text-white"
                >
                  Sign Up
                </button>
              </form>
            </div>
            <Link className="text-xs mt-3 text-right" href={"/signin"}>
              Already have an account?{" "}
              <span className="underline px-1"> Login </span>
            </Link>
          </div>
        </div>
      </main>
      {/* END OF: Sign Up Box  */}
    </motion.div>
  );
}
