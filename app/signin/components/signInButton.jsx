import Link from "next/link";

export default function SignInButton() {
  return (
    <Link href="/signin">
      <button className="bg-custom-main-dark px-4 py-2 transition-colors ease-linear rounded-lg text-white hover:bg-opacity-70">
        Sign In
      </button>
    </Link>
  );
}
