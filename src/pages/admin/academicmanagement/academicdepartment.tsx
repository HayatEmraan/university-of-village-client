import React from "react";
import { Button, Table } from "antd";
import type { TableColumnsType } from "antd";
import { TGlobalDepartmentFaculty } from "../../../types/global";
import { useGetAllDepartmentsQuery } from "../../../redux/features/admin/academicmanagement/academicdepartmentapi";

interface TAcademicFaculty {
  name: string;
}

interface DataType {
  key: React.Key;
  name: string;
  academicFaculty: TAcademicFaculty;
}

const columns: TableColumnsType<DataType> = [
  {
    title: "Department Name",
    dataIndex: "name",
  },
  {
    title: "Academic Faculty Name",
    dataIndex: "academicFaculty",
  },
  {
    title: "Action",
    render: () => {
      return <Button>Update</Button>;
    },
    width: "1%",
  },
];

const AcademicDepartment: React.FC = () => {
  const { data, isFetching } = useGetAllDepartmentsQuery(undefined);

  const tableData = data?.data.map(
    (
      faculty: TGlobalDepartmentFaculty & { academicFaculty: TAcademicFaculty }
    ) => ({
      key: faculty._id,
      name: faculty.name,
      academicFaculty: faculty.academicFaculty.name,
    })
  );

  return (
    <Table columns={columns} loading={isFetching} dataSource={tableData} />
  );
};

export default AcademicDepartment;
