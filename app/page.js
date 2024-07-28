"use client";

import Link from "next/link";
import SignInButton from "@/app/signin/components/signInButton";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";

export default function LandingPage() {
  const { data: session } = useSession();

  return (
    <main className="flex items-center justify-center my-28 sm:my-64 p-4">
      <div className="flex flex-col items-center justify-center text-center">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-6xl md:text-8xl text-bounce font-bold mb-2 font-pacifico"
        >
          Share Your
          <span className="text-custom-main-dark font-pacifico"> Recipes</span>
        </motion.h1>
        <motion.p
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-4 md:mb-7 mt-6 md:mt-10 text-xl md:text-3xl font-sand font-semibold"
        >
          Your Culinary Connection to the World!
        </motion.p>

        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-3"
        >
          {!session && (
            <div className="flex items-center space-x-3">
              <SignInButton />
              <span className="mx-3">or</span>
              <Link href="/home">
                <button className="bg-white text-custom-main-dark border-solid border-2 border-custom-main-dark px-4 py-2 rounded-lg hover:bg-custom-main-light transition-colors ease-linear">
                  Browse Recipes
                </button>
              </Link>
            </div>
          )}

          {session && (
            <Link href="/home">
              <button className="bg-white text-custom-main-dark border-solid border-2 border-custom-main-dark px-4 py-2 rounded-lg hover:bg-custom-main-light transition-colors ease-linear">
                Browse Recipes
              </button>
            </Link>
          )}
        </motion.div>


      </div>
    </main>
  );
}
