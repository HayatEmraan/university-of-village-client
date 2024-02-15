import React from "react";
import { Button, Table } from "antd";
import type { TableColumnsType } from "antd";
import { useGetAllAcademicFacultiesQuery } from "../../../redux/features/admin/academicmanagement/academicfacultyapi";
import { TGlobalDepartmentFaculty } from "../../../types/global";

interface DataType {
  key: React.Key;
  name: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Action",
    render: () => {
      return <Button>Update</Button>;
    },
    width: "1%",
  },
];

const AcademicFaculty: React.FC = () => {
  const { data, isFetching } = useGetAllAcademicFacultiesQuery(undefined);

  const tableData = data?.data.map((faculty: TGlobalDepartmentFaculty) => ({
    key: faculty._id,
    name: faculty.name,
  }));

  return (
    <Table columns={columns} loading={isFetching} dataSource={tableData} />
  );
};

export default AcademicFaculty;
