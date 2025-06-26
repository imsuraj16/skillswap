import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  request: [],
};

const requestSlice = createSlice({
  name: "request",
  initialState,
  reducers: {
    loadRequest: (state, action) => {
      state.request = action.payload;
    },
  },
});

export default requestSlice.reducer;
export const { loadRequest } = requestSlice.actions;
