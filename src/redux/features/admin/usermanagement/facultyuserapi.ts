import { baseApi } from "../../../api/baseapi";

const facultyUserApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createFaculty: builder.mutation({
      query: (data) => ({
        url: "/users/create-faculty",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useCreateFacultyMutation } = facultyUserApi;
