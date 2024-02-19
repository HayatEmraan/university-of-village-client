import { Button, Col } from "antd";
import UVForm from "../../../components/form/vform";
import UVSelect from "../../../components/form/vselect";
import { statusOptions } from "../../../constants/status";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicmanagement/academicsemesterapi";
import UVInput from "../../../components/form/vinput";
import UVDate from "../../../components/form/vdate";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { useAddSemesterRegistrationMutation } from "../../../redux/features/admin/coursemanagement/semesterregistrationapi";
import { TResponse } from "../../../types/global";

const CreateSemesterRegistration = () => {
  const { data: semester } = useGetAllSemestersQuery(undefined);

  const [semesterRegistration] = useAddSemesterRegistrationMutation();

  const semesterOptions = semester?.data.map((semester) => ({
    label: `${semester.name} ${semester.year}`,
    value: semester._id,
  }));

  const onSubmit = (data: FieldValues) => {
    const toastId = toast.loading("Creating, Please wait...");
    const registration = {
      academicSemester: data.academicSemester,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
      status: data.status,
      minCredits: Number(data.minCredits),
      maxCredits: Number(data.maxCredits),
    };
    (semesterRegistration(registration) as Promise<TResponse>)
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
      <h1 style={{ marginBottom: "15px" }}>Create semester registration</h1>
      <UVForm onSubmit={onSubmit}>
        <UVSelect
          Options={semesterOptions!}
          name="academicSemester"
          label="Academic Semester"
        />
        <UVDate name="startDate" label="Start date" />
        <UVDate name="endDate" label="End date" />
        <UVSelect Options={statusOptions} name="status" label="Status" />
        <UVInput type="number" name="minCredits" label="minCredits" />
        <UVInput type="number" name="maxCredits" label="maxCredits" />
        <Button htmlType="submit" type="primary">
          Submit
        </Button>
      </UVForm>
    </Col>
  );
};

export default CreateSemesterRegistration;
