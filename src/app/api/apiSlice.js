import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { loginUser, logoutUser } from "../../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "url",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const { token } = getState().auth;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});
