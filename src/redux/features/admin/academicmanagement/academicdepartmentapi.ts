import { baseApi } from "../../../api/baseapi";

const academicDepartmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllDepartments: builder.query({
      query: () => ({
        url: "/department/get-academic-departments",
        method: "GET",
      }),
      providesTags: ["academic_department"],
    }),
    createAcademicDepartment: builder.mutation({
      query: (args) => ({
        url: "/department/create-academic-department",
        method: "POST",
        body: args,
      }),
      invalidatesTags: ["academic_department"],
    }),
  }),
});

export const {
  useCreateAcademicDepartmentMutation,
  useGetAllDepartmentsQuery,
} = academicDepartmentApi;
