import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  alluser: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loadUser: (state, action) => {
      state.user = action.payload;
    },

    logout: (state, action) => {
      state.user = null;
    },

    loadAllUser: (state, action) => {
      state.alluser = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { loadUser, logout,loadAllUser } = userSlice.actions;
