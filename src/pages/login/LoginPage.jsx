import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Error from "../../components/Error";
import { useLoginMutation } from "../../features/auth/authApi";

export default function LoginPage() {
  const [email, setEmail] = useState("salman@gmail.com");
  const [password, setPassword] = useState("Lasman49$&");

  const [login, { isLoading, isSuccess, isError, error }] = useLoginMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  // if login is successful, redirect to home page
  const navigate = useNavigate();
  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [navigate, isSuccess]);

  return (
    <div className="bg-slate-100 sm:pt-40 sm:pb-60">
      <div className="container px-4 flex flex-col items-center justify-center py-8 mx-auto lg:py-0">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="title-one">Sign in to your account</h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full input"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  placeholder="••••••••"
                  className="w-full input"
                  required
                />
              </div>
              {/* below feature is not implemented yet */}
              {/* <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 "
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline"
                >
                  Forgot password?
                </a>
              </div> */}

              {isError && error && <Error message={error?.data?.message} />}

              <button disabled={isLoading} type="submit" className="button-one">
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500">
                Don’t have an account yet?{" "}
                <Link
                  to="/register"
                  className="font-medium text-primary-600 hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
