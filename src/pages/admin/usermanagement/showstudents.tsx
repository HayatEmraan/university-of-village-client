import React, { useState } from "react";
import { Button, Pagination, Space, Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { useGetAllStudentsQuery } from "../../../redux/features/admin/usermanagement/studentuserapi";

interface DataType {
  key: React.Key;
  name: string;
  id: string;
  gender: string;
  email: string;
  contactNo: string;
}

type TQuery = {
  [key: string]: string | number;
};

const columns: TableColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Roll No",
    dataIndex: "id",
  },
  {
    title: "Gender",
    render: (value) => {
      return <p style={{ textTransform: "capitalize" }}>{value.gender}</p>;
    },
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Contact No",
    dataIndex: "contactNo",
  },

  {
    title: "Action",
    render: () => {
      return (
        <Space>
          <Button>Details</Button>
          <Button>Update</Button>
          <Button>Block</Button>
        </Space>
      );
    },
    width: "1%",
  },
];

const ShowStudents: React.FC = () => {
  const [page, setPage] = useState(1);
  const [filterOption, setFilterOption] = useState<TQuery[]>([]);

  const { data, isFetching } = useGetAllStudentsQuery([
    { name: "limit", value: 10 },
    { name: "page", value: page },
    ...filterOption,
  ]);

  const tableData = data?.data.map((student) => ({
    key: student._id,
    id: student.id,
    name: student.name.firstName,
    contactNo: student.contactNo,
    gender: student.gender,
    email: student.email,
  }));

  const onChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: TQuery[] = [];
      filters?.name?.forEach((name) => {
        queryParams.push({
          name: "name",
          value: name as string,
        });
      });
      setFilterOption(queryParams);
    }
  };

  const metadata = data?.meta;

  return (
    <>
      <Table
        columns={columns}
        loading={isFetching}
        dataSource={tableData}
        onChange={onChange}
        pagination={false}
      />
      <Pagination
        style={{ float: "right", marginTop: "20px" }}
        pageSize={metadata?.limit}
        total={metadata?.total}
        onChange={(value) => setPage(value)}
      />
    </>
  );
};

export default ShowStudents;
