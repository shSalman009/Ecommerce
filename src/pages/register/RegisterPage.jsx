import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Error from "../../components/Error";
import { useRegisterMutation } from "../../features/auth/authApi";

export default function RegisterPage() {
  // input values
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // error state
  const [validationError, setValidationError] = useState(null);

  // register mutation
  const [register, { isLoading, isSuccess, isError, error }] =
    useRegisterMutation();

  // create a new user
  const handleSubmit = (e) => {
    e.preventDefault();

    setValidationError(null);

    if (password !== confirmPassword) {
      setValidationError("Password and confirm password are not match");
      return;
    }

    register({ name, email, password, confirmPassword });
  };

  // if register is successful, redirect to previous page
  const navigate = useNavigate();
  useEffect(() => {
    if (isSuccess) {
      navigate("/login");
    }
  }, [navigate, isSuccess]);

  return (
    <div className="bg-slate-100 sm:pt-20 sm:pb-40">
      <div className="container mx-auto px-4 flex flex-col items-center justify-center py-8 lg:py-0">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="title-one">Create and account</h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your name
                </label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  id="name"
                  className="w-full input"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="registerEmail"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="registerEmail"
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
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  id="confirmPassword"
                  placeholder="••••••••"
                  className="w-full input"
                  required
                />
              </div>

              {validationError ? <Error message={validationError} /> : null}
              {isError && error && <Error message={error?.data?.message} />}
              <button disabled={isLoading} type="submit" className="button-one">
                Create an account
              </button>
              <p className="text-sm font-light text-gray-500">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-primary-600 hover:underline"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
