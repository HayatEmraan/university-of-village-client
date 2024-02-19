export type TRegistered = {
  _id: string;
  academicSemester: AcademicSemester;
  status: string;
  startDate: string;
  endDate: string;
  minCredits: number;
  maxCredits: number;
  createdAt: string;
  updatedAt: string;
}

export interface AcademicSemester {
  _id: string;
  name: string;
  code: string;
  year: string;
  startMonth: string;
  endMonth: string;
  createdAt: string;
  updatedAt: string;
}
