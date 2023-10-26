import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SpinnerButton } from "../../components/Buttons";
import Error from "../../components/Error";
import Success from "../../components/Success";
import { useForgotPasswordMutation } from "../../features/user/userApi";

function ForgotPasswordPage() {
  const [email, setEmail] = useState();

  const [forgotPassword, { data, isLoading, isSuccess, isError, error }] =
    useForgotPasswordMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    forgotPassword({ email });
  };

  return (
    <div className="bg-slate-100 sm:pt-40 sm:pb-60">
      <div className="container px-4 flex flex-col items-center justify-center py-8 mx-auto lg:py-0">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="title-one">Forgot Password</h1>
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

              {isError && error && <Error message={error?.data?.message} />}
              {!error && isSuccess && <Success message={data?.message} />}

              <SpinnerButton
                isLoading={isLoading}
                disabled={isLoading}
                type="submit"
                text="Send Email"
              />

              <p className="text-sm font-light text-gray-500">
                Back to{" "}
                <Link
                  to="/login"
                  className="font-medium text-primary-600 hover:underline"
                >
                  Log in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
