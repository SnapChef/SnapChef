import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function SignInModal({ onClose }) {
  const router = useRouter();
  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex items-center justify-center"
      onClick={onClose}
    >
      <motion.div 
        animate={{ scale: [.5, 1.2, 1.0] }}
        transition={{ duration: .5, ease: "easeOut" }}
        className="bg-white p-8 rounded-lg flex flex-col items-center"
      >
        <p className="text-lg text-center mb-4">
          You need to be signed in to like, comment, or favorite this post.
        </p>
        <button
          className="bg-custom-main-dark hover:bg-orange-600 transition-colors ease-linear text-white px-4 py-2 rounded"
          onClick={() => {
            router.push("/signin");
          }}
        >
          Sign In
        </button>
      </motion.div>
    </div>
  );
}
