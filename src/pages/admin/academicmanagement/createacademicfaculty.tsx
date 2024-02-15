import { Button, Col } from "antd";
import UVForm from "../../../components/form/vform";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues } from "react-hook-form";
import { z } from "zod";
import UVInput from "../../../components/form/vinput";
import { useCreateAcademicFacultyMutation } from "../../../redux/features/admin/academicmanagement/academicfacultyapi";
import { TResponse } from "../../../types/global";
import { toast } from "sonner";

const academicFaculty = z.object({
  name: z.string({ required_error: "Academic faculty name is required!" }),
});

const CreateAcademicFaculty = () => {
  const [createFaculty] = useCreateAcademicFacultyMutation();

  const onSubmit = (data: FieldValues) => {
    const toastId = toast.loading("Creating, Please wait...");
    (createFaculty(data) as Promise<TResponse>)
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
      <UVForm onSubmit={onSubmit} resolver={zodResolver(academicFaculty)}>
        <UVInput type="text" name="name" label="Name" />
        <Button htmlType="submit" type="primary">
          Submit
        </Button>
      </UVForm>
    </Col>
  );
};

export default CreateAcademicFaculty;
