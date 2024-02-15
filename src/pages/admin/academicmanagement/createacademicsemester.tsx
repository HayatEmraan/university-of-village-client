import { Button, Col } from "antd";
import UVForm from "../../../components/form/vform";
import { FieldValues } from "react-hook-form";
import UVSelect from "../../../components/form/vselect";
import {
  semesterMonthOptions,
  semesterOptions,
  semesterYearOptions,
} from "../../../constants/semester";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicSemesterSchema } from "../../../schemas/academicsemester.schema";
import { useCreateSemesterMutation } from "../../../redux/features/admin/academicmanagement/academicsemesterapi";
import { toast } from "sonner";
import { TResponse } from "../../../types/global";

const CreateAcademicSemester = () => {
  const [createSemester] = useCreateSemesterMutation();
  const onSubmit = (data: FieldValues) => {
    const name = semesterOptions[Number(data.name) - 1].label;
    const semester = {
      name,
      code: data.name,
      year: String(data.year),
      startMonth: data.startMonth,
      endMonth: data.endMonth,
    };

    const toastId = toast.loading("Creating, Please wait...");
    (createSemester(semester) as Promise<TResponse>)
      .then((res) => {
        if (res.error) {
          toast.error(res.error.data.message, { id: toastId });
        }
        if (res.data) {
          toast.success(res.data.message, { id: toastId });
        }
      })
      .catch(() => {
        toast.error("Something went wrong", { id: toastId });
      });
  };
  return (
    <Col
      span={8}
      offset={8}
      style={{
        border: "1px solid red",
        padding: "30px",
        borderRadius: "10px",
      }}>
      <h1 style={{ marginBottom: "15px" }}>Create Academic semester</h1>
      <UVForm
        onSubmit={onSubmit}
        resolver={zodResolver(academicSemesterSchema)}>
        <UVSelect Options={semesterOptions} name="name" label="Name" />
        <UVSelect Options={semesterYearOptions} name="year" label="Year" />
        <UVSelect
          Options={semesterMonthOptions}
          name="startMonth"
          label="Start Month"
        />
        <UVSelect
          Options={semesterMonthOptions}
          name="endMonth"
          label="End Month"
        />
        <Button htmlType="submit" type="primary">
          Submit
        </Button>
      </UVForm>
    </Col>
  );
};

export default CreateAcademicSemester;
