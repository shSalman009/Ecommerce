import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
  accessToken: null,
  user: null,
};

// slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loggedIn(state, action) {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },
    loggedOut(state) {
      state.accessToken = null;
      state.user = null;
    },
  },
});

// export
export const { loggedIn, loggedOut } = authSlice.actions;
export default authSlice.reducer;
