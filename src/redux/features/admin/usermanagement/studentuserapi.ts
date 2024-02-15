import { TResponseRedux } from "../../../../types/global";
import { IStudent } from "../../../../types/student.type";
import { baseApi } from "../../../api/baseapi";

type TQuery = {
  [key: string]: string | number;
};

const studentUserApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createStudent: builder.mutation({
      query: (data) => ({
        url: "/users/create-student",
        method: "POST",
        body: data,
      }),
    }),
    getAllStudents: builder.query<TResponseRedux<IStudent[]>, TQuery[]>({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((element) => {
            params.append(element.name as string, element.value as string);
          });
        }
        return {
          url: "/students",
          params,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useCreateStudentMutation, useGetAllStudentsQuery } =
  studentUserApi;
