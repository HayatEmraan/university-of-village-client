import { Button, Col } from "antd";
import UVForm from "../../../components/form/vform";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues } from "react-hook-form";
import { z } from "zod";
import UVInput from "../../../components/form/vinput";
import UVSelect from "../../../components/form/vselect";
import { useGetAllAcademicFacultiesQuery } from "../../../redux/features/admin/academicmanagement/academicfacultyapi";
import { TGlobalDepartmentFaculty, TResponse } from "../../../types/global";
import { useCreateAcademicDepartmentMutation } from "../../../redux/features/admin/academicmanagement/academicdepartmentapi";
import { toast } from "sonner";

const academicDepartment = z.object({
  name: z.string({ required_error: "Academic department name is required!" }),
  academicFaculty: z.string({
    required_error: "Academic faculty is required!",
  }),
});

const CreateAcademicDepartment = () => {
  const { data, isFetching } = useGetAllAcademicFacultiesQuery(undefined);

  const [createDepartment] = useCreateAcademicDepartmentMutation();

  const academicFacultyOptions = data?.data.map(
    (faculty: TGlobalDepartmentFaculty) => ({
      label: faculty.name,
      value: faculty._id,
    })
  );

  const onSubmit = (data: FieldValues) => {
    const toastId = toast.loading("Creating, Please wait...", {
      duration: 2000,
    });
    (createDepartment(data) as Promise<TResponse>)
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
      <h1 style={{ marginBottom: "15px" }}>Create Academic department</h1>
      <UVForm onSubmit={onSubmit} resolver={zodResolver(academicDepartment)}>
        <UVInput type="text" name="name" label="Name" />
        <UVSelect
          Options={academicFacultyOptions}
          name="academicFaculty"
          disabled={isFetching}
          label="Academic faculty"
        />
        <Button htmlType="submit" type="primary">
          Submit
        </Button>
      </UVForm>
    </Col>
  );
};

export default CreateAcademicDepartment;
