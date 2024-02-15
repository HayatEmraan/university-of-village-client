import { z } from "zod";

export const academicSemesterSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(1, { message: "Name is required" }),
  year: z.number({
    required_error: "Year is required",
  }),
  startMonth: z.string({
    required_error: "Start month is required",
  }),
  endMonth: z.string({
    required_error: "End month is required",
  }),
});
