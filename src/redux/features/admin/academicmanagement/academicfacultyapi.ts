import { baseApi } from "../../../api/baseapi";

const academicFacultyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAcademicFaculties: builder.query({
      query: () => ({
        url: "/faculty/get-academic-faculties",
        method: "GET",
      }),
      providesTags: ["academic_faculty"],
    }),
    createAcademicFaculty: builder.mutation({
      query: (args) => ({
        url: "/faculty/create-academic-faculty",
        method: "POST",
        body: args,
      }),
      invalidatesTags: ["academic_faculty"],
    }),
  }),
});

export const {
  useGetAllAcademicFacultiesQuery,
  useCreateAcademicFacultyMutation,
} = academicFacultyApi;
