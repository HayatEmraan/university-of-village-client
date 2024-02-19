import { TResponseRedux } from "../../../../types/global";
import { TRegistered } from "../../../../types/registered.type";
import { baseApi } from "../../../api/baseapi";

const semesterRegistrationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addSemesterRegistration: builder.mutation({
      query: (data) => ({
        url: "/semester-registration/create-semester-registration",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["registered_semester"],
    }),
    getAllSemesterRegistrations: builder.query<TResponseRedux<TRegistered[]>, any>({
      query: () => ({
        url: "/semester-registration/get-all-semester-registration",
        method: "GET",
      }),
      providesTags: ["registered_semester"],
    }),
    updateASemesterRegistration: builder.mutation({
      query: (data) => ({
        url: `/semester-registration/update-semester-registration/${data.id}`,
        method: "PATCH",
        body: data.data,
      }),
      invalidatesTags: ["registered_semester"],
    }),
  }),
});

export const {
  useAddSemesterRegistrationMutation,
  useGetAllSemesterRegistrationsQuery,
  useUpdateASemesterRegistrationMutation,
} = semesterRegistrationApi;
