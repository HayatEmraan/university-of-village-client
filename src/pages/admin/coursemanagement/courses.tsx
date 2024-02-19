import { Modal } from "antd";
import React, { useState } from "react";
import { Button, Table } from "antd";
import type { TableColumnsType } from "antd";

import {
  useAssignFacultyToCourseMutation,
  useGetAllCoursesQuery,
} from "../../../redux/features/admin/coursemanagement/courseapi";
import UVForm from "../../../components/form/vform";
import { FieldValues } from "react-hook-form";
import UVSelect from "../../../components/form/vselect";
import { useGetAllFacultiesQuery } from "../../../redux/features/admin/usermanagement/facultyuserapi";
import { toast } from "sonner";
import { TResponse } from "../../../types/global";

interface DataType {
  key: React.Key;
  name: string;
  code: number;
  prefix: string;
}

const RegisteredSemester = () => {
  const { data, isFetching } = useGetAllCoursesQuery(undefined);

  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Prefix",
      dataIndex: "prefix",
    },
    {
      title: "Code",
      dataIndex: "code",
    },
    {
      title: "Action",
      render: (item) => {
        return <ModelFaculty courseInfo={item} />;
      },
      width: "1%",
    },
  ];

  const tableData = data?.data.result.map((course) => ({
    key: course._id,
    name: course.title,
    code: course.code,
    prefix: course.prefix,
  }));

  return (
    <Table columns={columns} loading={isFetching} dataSource={tableData} />
  );
};

const ModelFaculty = ({ courseInfo }: { courseInfo: DataType }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: faculties } = useGetAllFacultiesQuery(undefined);
  const [assign] = useAssignFacultyToCourseMutation();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const facultyOptions = faculties?.data.map((faculty) => ({
    label: `${faculty?.name?.firstName} ${faculty?.name?.middleName} ${faculty?.name?.lastName}`,
    value: faculty._id,
  }));

  const onSubmit = (data: FieldValues) => {
    const toastId = toast.loading("Updating, Please wait...");
    const facultyData = {
      courseId: courseInfo.key,
      data,
    };
    (assign(facultyData) as Promise<TResponse>)
      .then((res) => {
        if (res.error) {
          toast.error(res.error.data.message, { id: toastId });
        }
        if (res.data) {
          toast.success(res.data.message, { id: toastId });
          setIsModalOpen(false);
        }
      })
      .catch(() => {
        toast.error("Something went wrong", { id: toastId });
      });
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add Faculties
      </Button>
      <Modal
        title="Add Faculties"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}>
        <UVForm onSubmit={onSubmit}>
          <UVSelect
            Options={facultyOptions!}
            multi="multiple"
            name="faculties"
            label="Faculties"
          />
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </UVForm>
      </Modal>
    </>
  );
};

export default RegisteredSemester;
