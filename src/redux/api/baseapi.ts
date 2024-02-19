import {
  BaseQueryApi,
  BaseQueryFn,
  DefinitionType,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { removeCredentials, setCredentials } from "../features/auth/authslice";
import { decodeToken } from "../../utils/decode";
import { TRefresh } from "../../types/refresh.type";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/v1",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const { token } = (getState() as RootState).credential;
    if (token) {
      headers.set("authorization", token);
    }
    return headers;
  },
});

const customBaseQuery: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    const refreshResult = await baseQuery(
      {
        url: "/auth/refresh-token",
        method: "POST",
      },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      const { data } = refreshResult.data as TRefresh;
      api.dispatch(
        setCredentials({ user: await decodeToken(data), token: data })
      );
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(removeCredentials());
    }
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: customBaseQuery,
  tagTypes: [
    "user",
    "course",
    "academic_department",
    "academic_semester",
    "academic_faculty",
    "registered_semester",
  ],
  endpoints: () => ({}),
});
