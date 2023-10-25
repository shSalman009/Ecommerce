import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-slate-950 font-semibold">
      <h2 className="text-8xl text-gray-500">404</h2>
      <h2 className="text-4xl text-gray-200 mb-6">Page Not Found</h2>
      <Link to="/" type="button" className="button-two">
        Go Back Home
      </Link>
    </div>
  );
}
