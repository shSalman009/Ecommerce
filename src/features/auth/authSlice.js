import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
  user: null,
};

// slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loggedIn(state, action) {
      state.user = action.payload;
    },
    loggedOut(state) {
      state.user = null;
    },
  },
});

// export
export const { loggedIn, loggedOut } = authSlice.actions;
export default authSlice.reducer;
