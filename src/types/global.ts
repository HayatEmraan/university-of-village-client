import { BaseQueryApi } from "@reduxjs/toolkit/query";

type TErrorResponse = {
  data: {
    message: string;
    stack: string;
    success: boolean;
  };
  status: number;
};

export type TResponse = {
  data?: any;
  error?: TErrorResponse;
};

export type TSemester = {
  _id: string;
  name: string;
  code: string;
  year: string;
  startMonth: string;
  endMonth: string;
};

export type TMeta = {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
};

export type TResponseGlobal<T> = {
  data: T;
  meta: TMeta;
  message: string;
  success: boolean;
};

export type TResponseRedux<T> = TResponseGlobal<T> & BaseQueryApi;


export type TGlobalDepartmentFaculty = {
  [k: string]: unknown;
};

export type TFilterQuery = {
  name: string;
  value: string;
};