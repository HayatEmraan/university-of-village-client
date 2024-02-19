import { TMeta } from "./global";

export type TCourse = {
  _id: string;
  title: string;
  prefix: string;
  code: number;
  credits: number;
  isDeleted: boolean;
  preRequisiteCourses?: PreRequisiteCourse[];
  createdAt: string;
  updatedAt: string;
};

export type TCourseResponse = {
  meta: TMeta;
  result: TCourse[];
};

export interface PreRequisiteCourse {
  course: string;
  isDeleted: boolean;
}
