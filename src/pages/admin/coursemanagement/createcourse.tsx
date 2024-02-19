import { Button, Col } from "antd";
import UVForm from "../../../components/form/vform";
import UVSelect from "../../../components/form/vselect";
import UVInput from "../../../components/form/vinput";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { TResponse } from "../../../types/global";
import {
  useCreateCourseMutation,
  useGetAllCoursesQuery,
} from "../../../redux/features/admin/coursemanagement/courseapi";

const CreateCourse = () => {
  const { data: courseData } = useGetAllCoursesQuery(undefined);

  const [course] = useCreateCourseMutation();

  const preRequisiteOptions = courseData?.data?.result.map((course) => ({
    label: course.title,
    value: course._id,
  }));

  const onSubmit = (data: FieldValues) => {
    const toastId = toast.loading("Creating, Please wait...");
    const courseData = {
      title: data.title,
      prefix: data.prefix,
      code: Number(data.code),
      status: data.status,
      credits: Number(data.credits),
      preRequisiteCourses: data.preRequisiteCourses
        ? data.preRequisiteCourses?.map((id: string) => ({
            course: id,
            isDeleted: false,
          }))
        : [],
    };
    (course(courseData) as Promise<TResponse>)
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
      <h1 style={{ marginBottom: "15px" }}>Create course</h1>
      <UVForm onSubmit={onSubmit}>
        <UVInput type="text" name="title" label="Title" />
        <UVInput type="text" name="prefix" label="Prefix" />
        <UVInput type="number" name="code" label="Code" />
        <UVInput type="number" name="credits" label="Credits" />
        <UVSelect
          Options={preRequisiteOptions!}
          multi="multiple"
          name="preRequisiteCourses"
          label="preRequisiteCourses"
        />
        <Button htmlType="submit" type="primary">
          Submit
        </Button>
      </UVForm>
    </Col>
  );
};

export default CreateCourse;
