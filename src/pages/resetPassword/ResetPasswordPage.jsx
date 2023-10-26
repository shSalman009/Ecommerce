import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SpinnerButton } from "../../components/Buttons";
import Error from "../../components/Error";
import Success from "../../components/Success";
import { useResetPasswordMutation } from "../../features/user/userApi";

function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { token } = useParams();

  const [resetPassword, { data, isLoading, isSuccess, isError, error }] =
    useResetPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
    }

    resetPassword({
      newPassword: password,
      confirmNewPassword: confirmPassword,
      token,
    });
  };

  // reset form and redirect to login page after successful reset
  const navigate = useNavigate();
  useEffect(() => {
    if (isSuccess) {
      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  }, [isSuccess, navigate]);

  return (
    <div className="bg-slate-100 sm:pt-40 sm:pb-60">
      <div className="container px-4 flex flex-col items-center justify-center py-8 mx-auto lg:py-0">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="title-one">Reset Password</h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  New Password
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
                  Confirm Password
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

              {isError && error && <Error message={error?.data?.message} />}
              {!error && isSuccess && <Success message={data?.message} />}

              <SpinnerButton
                isLoading={isLoading}
                disabled={isLoading}
                type="submit"
                text="Reset Password"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
