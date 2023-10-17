import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAuthCheckQuery } from "../features/auth/authApi";
import { loggedIn } from "../features/auth/authSlice";

export default function useAuthCheck() {
  const dispatch = useDispatch();
  const { data, isSuccess, isLoading } = useAuthCheckQuery();
  const [authCompleted, setAuthCompleted] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      const user = data.payload;
      dispatch(loggedIn(user));
    }
  }, [isSuccess, data, dispatch]);

  useEffect(() => {
    if (!isLoading) {
      setAuthCompleted(true);
    }
  }, [isLoading]);

  // Return isLoading until authCompleted is true
  return isLoading || !authCompleted;
}
