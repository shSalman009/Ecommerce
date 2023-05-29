import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  brands: [],
  price: {
    min: 0,
    max: 0,
  },
};

// api slice
const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    // categories reducers
    addCategory(state, action) {
      state.categories.push(action.payload);
    },
    removeCategory(state, action) {
      const index = state.categories.findIndex(
        (item) => item === action.payload
      );
      state.categories.splice(index, 1);
    },

    // brands reducers
    addBrand(state, action) {
      state.brands.push(action.payload);
    },
    removeBrand(state, action) {
      const index = state.brands.findIndex((item) => item === action.payload);
      state.brands.splice(index, 1);
    },

    // price reducers
    setPrice(state, action) {
      state.price = action.payload;
    },
  },
});

// export
export const { addCategory, removeCategory, addBrand, removeBrand, setPrice } =
  filterSlice.actions;
export default filterSlice.reducer;
