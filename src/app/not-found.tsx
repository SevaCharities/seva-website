import Link from "next/link";

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <h1 className="text-4xl font-bold text-orange-2">404 - Page Not Found</h1>
      <p className="mt-4 text-lg text-gray-700">
        {
          "Oops! The page you are looking for does not exist."
        }
      </p>
      <Link href="/">
        <button className="mt-6 px-4 py-2 text-white bg-orange-2 rounded hover:bg-orange-1">
          Go Back Home
        </button>
      </Link>
    </div>
  );
}
