import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
};

// api slice
const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    addCategories(state, action) {
      state.categories.push(action.payload);
    },
    removeCategories(state, action) {
      const index = state.categories.findIndex(
        (item) => item === action.payload
      );
      state.categories.splice(index, 1);
    },
  },
});

// export
export const { addCategories, removeCategories } = filterSlice.actions;
export default filterSlice.reducer;
