import { FieldValues } from "react-hook-form";
import UVForm from "../../../components/form/vform";
import UVInput from "../../../components/form/vinput";
import { Button, Col, Divider, Row } from "antd";
import { z } from "zod";
import UVSelect from "../../../components/form/vselect";
import { genderOptions } from "../../../constants/gender";
import UVDate from "../../../components/form/vdate";
import UVImg from "../../../components/form/vimg";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicmanagement/academicsemesterapi";
import { useGetAllDepartmentsQuery } from "../../../redux/features/admin/academicmanagement/academicdepartmentapi";
import { TGlobalDepartmentFaculty, TResponse } from "../../../types/global";
import { toast } from "sonner";
import { useCreateStudentMutation } from "../../../redux/features/admin/usermanagement/studentuserapi";
import { zodResolver } from "@hookform/resolvers/zod";

const studentSchema = z.object({
  name: z.object({
    firstName: z.string({ required_error: "First name is required!" }),
    middleName: z.string(),
    lastName: z.string({ required_error: "Last name is required!" }),
  }),
  gender: z.string({ required_error: "Gender is required!" }),
  dateOfBirth: z.string({ required_error: "Date of birth is required!" }),
  email: z.string({ required_error: "Email is required!" }).email(),
  contactNo: z.string({ required_error: "Contact number is required!" }),
  emergencyNo: z.string({ required_error: "Emergency number is required!" }),
  presentAddress: z.string({
    required_error: "Present address is required!",
  }),
  permanentAddress: z.string({
    required_error: "Permanent address is required!",
  }),
  guardian: z.object({
    father: z.object({
      fatherName: z.string({ required_error: "Father name is required!" }),
      fatherOccupation: z.string({
        required_error: "Father occupation is required!",
      }),
      fatherContactNo: z.string({
        required_error: "Father contact number is required!",
      }),
    }),
    mother: z.object({
      motherName: z.string({ required_error: "Mother name is required!" }),
      motherOccupation: z.string({
        required_error: "Mother occupation is required!",
      }),
      motherContactNo: z.string({
        required_error: "Mother contact number is required!",
      }),
    }),
  }),
  localGuardian: z.object({
    name: z.string({ required_error: "Local guardian name is required!" }),
    occupation: z.string({
      required_error: "Local guardian occupation is required!",
    }),
    contactNo: z.string({
      required_error: "Local guardian contact number is required!",
    }),
  }),
  academicSemester: z.string({
    required_error: "Academic semester is required!",
  }),
  academicDepartment: z.string({
    required_error: "Academic department is required!",
  }),
});

const CreateStudent = () => {
  const { data: academicSemester, isFetching: isSemesterFetching } =
    useGetAllSemestersQuery(undefined);

  const { data: academicDepartment, isFetching: isDepartmentFetching } =
    useGetAllDepartmentsQuery(undefined, {
      skip: isSemesterFetching,
    });

  const [createStudent] = useCreateStudentMutation();

  const semesterData = academicSemester?.data.map((semester) => ({
    value: semester._id,
    label: `${semester.name} ${semester.year}`,
  }));

  const departmentData = academicDepartment?.data.map(
    (department: TGlobalDepartmentFaculty) => ({
      value: department._id,
      label: department.name,
    })
  );

  const onSubmit = (data: FieldValues) => {
    const formData = new FormData();
    const { profileImage, ...restInfo } = data;
    const studentInfo = {
      student: restInfo,
    };

    if (profileImage) {
      formData.append("file", profileImage);
    }
    formData.append("data", JSON.stringify(studentInfo));

    (createStudent(formData) as Promise<TResponse>)
      .then((res) => {
        if (res.error) {
          toast.error(res.error.data.message);
        }
        if (res.data) {
          toast.success(res.data.message);
        }
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
  };

  return (
    <UVForm onSubmit={onSubmit} resolver={zodResolver(studentSchema)}>
      <>
        <Divider>Personal Details</Divider>
        <Row gutter={16}>
          <Col span={24} md={12} lg={8}>
            <UVInput type="text" name="name.firstName" label="First Name" />
          </Col>

          <Col span={24} md={12} lg={8}>
            <UVInput type="text" name="name.middleName" label="Middle Name" />
          </Col>

          <Col span={24} md={12} lg={8}>
            <UVInput type="text" name="name.lastName" label="Last Name" />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24} md={12} lg={8}>
            <UVImg name="profileImage" label="Profile Image" />
          </Col>

          <Col span={24} md={12} lg={8}>
            <UVSelect Options={genderOptions} name="gender" label="Gender" />
          </Col>

          <Col span={24} md={12} lg={8}>
            <UVDate name="dateOfBirth" label="Date of Birth" />
          </Col>
        </Row>
      </>

      <>
        <Divider>Contact Details</Divider>
        <Row gutter={16}>
          <Col span={24} md={12} lg={8}>
            <UVInput type="text" name="email" label="Email" />
          </Col>

          <Col span={24} md={12} lg={8}>
            <UVInput type="text" name="contactNo" label="Contact No" />
          </Col>

          <Col span={24} md={12} lg={8}>
            <UVInput type="text" name="emergencyNo" label="Emergency No" />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24} md={12}>
            <UVInput
              type="text"
              name="presentAddress"
              label="Present Address"
            />
          </Col>

          <Col span={24} md={12}>
            <UVInput
              type="text"
              name="permanentAddress"
              label="Permanent Address"
            />
          </Col>
        </Row>
      </>
      <>
        <Divider>Guardian Details</Divider>
        <Row gutter={16}>
          <Col span={24} md={12} lg={8}>
            <UVInput
              type="text"
              name="guardian.father.fatherName"
              label="Father Name"
            />
          </Col>

          <Col span={24} md={12} lg={8}>
            <UVInput
              type="text"
              name="guardian.father.fatherOccupation"
              label="Father Occupation"
            />
          </Col>

          <Col span={24} md={12} lg={8}>
            <UVInput
              type="text"
              name="guardian.father.fatherContactNo"
              label="Father Contact No"
            />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24} md={12} lg={8}>
            <UVInput
              type="text"
              name="guardian.mother.motherName"
              label="Father Name"
            />
          </Col>

          <Col span={24} md={12} lg={8}>
            <UVInput
              type="text"
              name="guardian.mother.motherOccupation"
              label="Father Occupation"
            />
          </Col>

          <Col span={24} md={12} lg={8}>
            <UVInput
              type="text"
              name="guardian.mother.motherContactNo"
              label="Father Contact No"
            />
          </Col>
        </Row>
      </>

      <>
        <Divider orientation="center">Local Guardian Details</Divider>
        <Row gutter={16}>
          <Col span={24} md={12} lg={8}>
            <UVInput
              type="text"
              name="localGuardian.name"
              label="Guardian Name"
            />
          </Col>

          <Col span={24} md={12} lg={8}>
            <UVInput
              type="text"
              name="localGuardian.occupation"
              label="Guardian Occupation"
            />
          </Col>

          <Col span={24} md={12} lg={8}>
            <UVInput
              type="text"
              name="localGuardian.contactNo"
              label="Guardian Contact No"
            />
          </Col>
        </Row>
      </>

      <>
        <Divider orientation="center">Academic Details</Divider>
        <Row gutter={16}>
          <Col span={24} md={12}>
            <UVSelect
              disabled={isSemesterFetching}
              Options={semesterData!}
              name="academicSemester"
              label="Academic Semester"
            />
          </Col>

          <Col span={24} md={12}>
            <UVSelect
              disabled={isDepartmentFetching}
              Options={departmentData}
              name="academicDepartment"
              label="Academic Department"
            />
          </Col>
        </Row>
      </>

      <Button htmlType="submit">Submit</Button>
    </UVForm>
  );
};

export default CreateStudent;
