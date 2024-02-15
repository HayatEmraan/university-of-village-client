import { baseApi } from "../../../api/baseapi";
import {
  TFilterQuery,
  TResponseRedux,
  TSemester,
} from "../../../../types/global";

const academicSemesterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSemesters: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((element: TFilterQuery) => {
            params.append(element.name, element.value);
          });
        }
        return {
          url: "/academic",
          params,
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<TSemester[]>) => ({
        data: response.data,
        meta: response.meta,
      }),
      providesTags: ["academic_semester"],
    }),
    createSemester: builder.mutation({
      query: (data) => ({
        url: "/academic/create-academic-semester",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["academic_semester"],
    }),
  }),
});

export const { useGetAllSemestersQuery, useCreateSemesterMutation } =
  academicSemesterApi;
