import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  skill: [],
};

const skillSlice = createSlice({
  name: "skill",
  initialState,
  reducers: {
    loadSkill: (state, action) => {
      state.skill = action.payload;
    },
  },
});

export default skillSlice.reducer;
export const { loadSkill } = skillSlice.actions;
