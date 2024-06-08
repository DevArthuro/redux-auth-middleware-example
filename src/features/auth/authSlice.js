import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null },
  reducers: {
    loginUser: (state, action) => {
      state = { ...action.payload };
    },
    logoutUser: (state, _) => {
      state.user = null;
      state.token = null;
    },
  },
});

export default authSlice.reducer;

export const userSelect = (state) => state.auth.user;
export const tokenSelect = (state) => state.auth.token;

export const { loginUser, logoutUser } = authSlice.actions;
