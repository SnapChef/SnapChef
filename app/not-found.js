import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-9xl font-bold text-gray-700">404 </h1>
      <p className="text-lg mt-4">
        The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="bg-orange-500 mt-8 hover:underline hover:bg-custom-main-light py-3 px-2 text-white rounded-md"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
