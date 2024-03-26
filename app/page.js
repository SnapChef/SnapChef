"use client";

import Link from "next/link";
import SignInButton from "@/app/signin/components/signInButton";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function LandingPage() {
  const { data: session } = useSession();

  return (
    <main className="flex tems-center justify-center ml-10 h-screen">
      <div className="flex flex-col items-center justify-center">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-8xl text-bounce font-bold mb-2 font-pacifico"
        >
          Share Your
          <span className="text-custom-main-dark font-pacifico"> Recipes</span>
        </motion.h1>
        <motion.p
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-7 mt-10 text-3xl font-sand font-semibold"
        >
          Your Culinary Connection to the World!
        </motion.p>

        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex items-center justify-center"
        >
          {!session && (
            <div>
              <SignInButton />
              <span className="mx-3">or</span>
            </div>
          )}

          <div className="bg-white text-custom-main-dark border-solid border-2 border-custom-main-dark px-4 py-2 rounded-lg hover:bg-custom-main-light transition-colors ease-linear">
            <Link href="/home">Browse Recipes</Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
