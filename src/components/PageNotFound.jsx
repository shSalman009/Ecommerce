import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-slate-950 font-semibold">
      <h2 className="text-8xl text-gray-500">404</h2>
      <h2 className="text-4xl text-gray-200 mb-6">Page Not Found</h2>
      <Link
        to="/"
        type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
      >
        Go Back Home
      </Link>
    </div>
  );
}
