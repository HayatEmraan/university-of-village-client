import { baseApi } from "../../../api/baseapi";

const adminUserApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createAdmin: builder.mutation({
      query: (data) => ({
        url: "/users/create-admin",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useCreateAdminMutation } = adminUserApi;
