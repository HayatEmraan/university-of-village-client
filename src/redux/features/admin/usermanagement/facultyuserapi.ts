import { TFaculty } from "../../../../types/faculty.type";
import { TResponseRedux } from "../../../../types/global";
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
    getAllFaculties: builder.query<TResponseRedux<TFaculty[]>, any>({
      query: () => ({
        url: "/faculties",
        method: "GET",
      }),
    }),
  }),
});

export const { useCreateFacultyMutation, useGetAllFacultiesQuery } =
  facultyUserApi;
