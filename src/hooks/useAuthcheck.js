import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loggedIn } from "../features/auth/authSlice";

export default function useAuthcheck() {
  const [authCheck, setAuthCheck] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = localStorage.getItem("auth");

    if (auth) {
      dispatch(loggedIn(JSON.parse(auth)));
    }
    setAuthCheck(true);
  }, [dispatch]);

  return authCheck;
}
