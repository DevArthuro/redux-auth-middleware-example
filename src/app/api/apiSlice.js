import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { loginUser, logoutUser } from "../../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3500",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const { token } = getState().auth;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryRefreshToken = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error.originalStatus === 403) {
    console.log("Send refresh token");
    const refreshResult = await baseQuery("/refresh", api, extraOptions);
    console.log("Refreshing rsults");
    if (refreshResult.data) {
      const user = api.getState().auth.user;
      api.dispatch(loginUser({ ...refreshResult.data, user }));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logoutUser());
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryRefreshToken,
  endpoints: (builder) => ({}),
});
