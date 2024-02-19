import { TCourseResponse } from "../../../../types/course.type";
import { TResponseRedux } from "../../../../types/global";
import { baseApi } from "../../../api/baseapi";

const courseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: (data) => ({
        url: "/courses/create-course",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["course"],
    }),
    getAllCourses: builder.query<TResponseRedux<TCourseResponse>, any>({
      query: () => ({
        url: "/courses",
        method: "GET",
      }),
      providesTags: ["course"],
    }),
    assignFacultyToCourse: builder.mutation({
      query: (data) => ({
        url: `/courses/${data.courseId}/assign-faculties`,
        method: "PUT",
        body: data.data,
      }),
      invalidatesTags: ["course"],
    }),
  }),
});

export const { useCreateCourseMutation, useGetAllCoursesQuery , useAssignFacultyToCourseMutation} = courseApi;
